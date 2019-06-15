/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import userStore from '../fixtures/users';
import response from '../helper/responseSchema';
import validationSchema from '../helper/validationSchema';
import errorHandler from '../helper/errorHandler';
import helper from '../helper/usefulFunctions';
import loanStore from '../fixtures/loans';

export default class Loans {
  /**
   * @async
   * @method - This gives a user access to availabe loans
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static getAvailableLoans(req, res) {
    return res.status(200).json(response.success('Loans Available', loanStore));
  }
}
