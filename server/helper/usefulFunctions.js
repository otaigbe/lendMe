import Moment from 'moment';
import { extendMoment } from 'moment-range';
import response from './responseSchema';

const moment = extendMoment(Moment);

// const extMoment = momentRange.extendMoment(moment().format('YYYY MM DD'));

export default class Helpers {
  /**
     * This method auto generates an email from the username provided
     * @method
     * @param {string} username - username string
     */
  static checkIfEmailAlreadyExists(users, email) {
    return users.find(user => user.email === email);
  }

  static checkForActiveLoans(map, user, currentBeginDate, res) {
    if (map.has(user)) {
      const activeLoans = map.get(user);
      const reply = activeLoans.map((loan) => {
        const begin = new Date(loan.startDate);
        const end = new Date(loan.dueDate);
        const range = moment().range(begin, end);
        return range.contains(new Date(currentBeginDate));
        // if (range.contains(new Date(currentBeginDate) === true)) {
        //   return res.status(409).json(response.failure('You already have loan repayments scheduled for that period! Choose another begin date', {}));
        // }
      });
      return reply;
    }
  }

  static customUpdate(map, key, value) {
    const activeLoans = map.get(key);
    activeLoans.push(value);
    // map.set(key, activeLoans);
  }
}
