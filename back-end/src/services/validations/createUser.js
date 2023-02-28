const CustomError = require('../error/CustomError');
const login = require('./login');

const createUser = (name, email, password) => {
  if (!name || name.length < 12) {
    throw new CustomError('BAD_REQUEST', 'Field name requires minimum 12 characters');
  }

  login(email, password);
};

module.exports = createUser;