import Joi from 'joi';

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
    });
  }
}
