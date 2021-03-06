import joi from 'joi';
import extension from '@hapi/joi-date';

const Joi = joi.extend(extension);

export default class Schemas {
  /**
   * returns schema for validating user signup data
   * @returns {Object} schema for validation
   */
  static get userSchema() {
    return Joi.object({
      firstname: Joi.string().min(2).trim().required(),
      lastname: Joi.string().trim().min(2).required(),
      password: Joi.string().alphanum().min(4).trim()
        .max(50)
        .required(),
      email: Joi.string().email().min(5).trim()
        .required(),
      occupation: Joi.string().min(2).trim().required(),
      employedby: Joi.string().min(2).trim().required(),
      annualsalary: Joi.string().min(2).trim().required()
    });
  }

  /**
   * returns schema for validating user signin data
   * @returns {Object} schema for validation
   */
  static get signinSchema() {
    return Joi.object({
      email: Joi.string().email().min(5).trim()
        .required(),
      password: Joi.string().alphanum().trim().min(4)
        .max(50)
        .required(),
    });
  }

  static get loanApplicationSchema() {
    return Joi.object({
      loanName: Joi.string().trim().required(),
      begin: Joi.date().format('YYYY-MM-DD'),
    });
  }
}
