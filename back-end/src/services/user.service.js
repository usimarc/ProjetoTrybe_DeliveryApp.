const { User } = require('../database/models');
const validations = require('./validations');

const login = async ({ email, password }) => {
  validations.login(email, password);

  return { message: 'voce esta logado' };
};

module.exports = {
  login,
};
