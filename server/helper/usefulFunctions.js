export default class Helpers {
  /**
     * This method auto generates an email from the username provided
     * @method
     * @param {string} username - username string
     */
  static checkIfEmailAlreadyExists(users, email) {
    return users.find(user => user.email === email);
  }
}
