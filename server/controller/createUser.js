/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import userStore from '../model/fixtures';
import response from '../helper/responseSchema';
import validationSchema from '../helper/validationSchema';
import errorHandler from '../helper/errorHandler';
import helper from '../helper/usefulFunctions';

export default class CreateUser {
  /**
   * @async
   * @method - This gives a user access to his/her account
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static async register(req, res) {
    const result = Joi.validate(req.body, validationSchema.userSchema, { convert: false });
    if (result.error === null) {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const {
        firstname, lastname, email, id,
      } = req.body;
      const user = {};
      const tokenObj = {};
      user.id = uuid();
      tokenObj.id = id;
      user.firstname = firstname;
      tokenObj.email = email;
      user.lastname = lastname;
      user.email = email;
      user.password = hashedPassword;
      const token = jwt.sign(tokenObj, process.env.SECRETKEY);
      user.token = token;
      const alreadyExistentUser = helper.checkIfEmailAlreadyExists(userStore, user.email);
      if (alreadyExistentUser) {
        return res.status(409).json(response.failure('chosen username/email already exists, choose a unique username/email.', {}));
      }
      userStore.push(user);
      return res.status(201).json(response.success('Signup Successful!Login With your email and password', user));
    }
    errorHandler.validationError(res, result);
  }
}
