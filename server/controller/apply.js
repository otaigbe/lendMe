/* eslint-disable consistent-return */
import Joi from 'joi';
import moment from 'moment';
import response from '../helper/responseSchema';
import validationSchema from '../helper/validationSchema';
import errorHandler from '../helper/errorHandler';
import helper from '../helper/usefulFunctions';
import loanStore from '../fixtures/loans';
import activeLoans from '../fixtures/activeloans';

moment().format('YYYY MM DD');
export default class LoanApplication {
  /**
   * @async
   * @method - This helps apply and process the loan
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */

  static async apply(req, res) {
    const result = Joi.validate(req.body, validationSchema.loanApplicationSchema, { convert: true });
    if (result.error === null) {
      const { loanName, begin } = req.body;
      if (moment().isAfter(begin) === true) {
        return res.status(400).json(response.failure('Provide a valid date at which time you wish to access the loan! Starting from the next work day', {}));
      }
      const loanSought = loanStore.find(loan => loan.name.toLowerCase() === loanName);
      if (loanSought == undefined) {
        return res.status(400).json(response.failure(`There is no loan programme by this name:${loanName}`, {}));
      }
      const loanDurationInMonths = parseInt(loanSought.tenure, 10);
      const expDate = moment(begin).add(loanDurationInMonths, 'months');
      const { email } = req.user;
      const reply = helper.checkForActiveLoans(activeLoans, email, begin, res);
      if (reply != undefined || reply != null) {
        if (reply.includes(true)) {
          return res.status(409).json(response.failure('You already have loan repayments scheduled for that period! Choose another begin date', {}));
        }
      }
      const loanPackage = {};
      loanPackage.name = loanSought.name;
      loanPackage.description = loanSought.description;
      loanPackage.interestrate = loanSought.interestRate;
      loanPackage.amount = loanSought.amount;
      loanPackage.tenure = loanSought.tenure;
      loanPackage.startDate = begin;
      loanPackage.dueDate = expDate;
      const loansContainer = [];
      if (activeLoans.has(email)) {
        helper.customUpdate(activeLoans, email, loanPackage);
      } else {
        loansContainer.push(loanPackage);
        activeLoans.set(email, loansContainer);
      }
      return res.status(201).json(response.success('Loan Application Approved!', loanPackage));
    }
    errorHandler.validationError(res, result);
  }
}
