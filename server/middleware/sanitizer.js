/* eslint-disable default-case */
import { check, body, validationResult } from 'express-validator/check';

export default class Sanitizer {
  /**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static loginTrimWhitespace() {
    return [
      check('password').trim().escape(),
      check('email').isEmail().trim().normalizeEmail(),
    ];
  }

  /**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static applySanitizer() {
    return [
      check('loanName').trim().escape(),
    ];
  }

}
