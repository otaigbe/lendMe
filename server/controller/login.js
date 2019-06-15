/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validationResult from 'express-validator/check';
import winston from 'winston';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import schema from '../helper/validationSchema';
import userStore from '../model/fixtures';

export default class LoginController {
  /**
   * @async
   * @method - This gives a user access to his/her account
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static async logIn(req, res) {
    const result = Joi.validate(req.body, schema.signinSchema, { convert: true });
    if (result.error === null) {
      const { password, email } = req.body;
      const potentialUser = userStore.find(user => user.email === email);
      if (potentialUser) {
        const validPassword = await bcrypt.compare(password, potentialUser.password);
        if (validPassword) {
          winston.info('Everything checks out');
          const {
            firstname, lastname, email, token,
          } = potentialUser;
          return res.status(200).json(response.success('You are now Logged in', {
            firstname, lastname, email, token,
          }));
        }
        return res.status(400).json(response.failure('Invalid username or password.', {}));
      }
      return res.status(404).json(response.failure('Something wrong with username or password', {}));
    }
    errorHandler.validationError(res, result);
  }
}
