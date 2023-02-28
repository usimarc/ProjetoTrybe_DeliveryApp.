const { User } = require('../database/models');
const CustomError = require('./error/CustomError');
const validations = require('./validations');

const login = async ({ email, password }) => {
  validations.login(email, password);

  const user = await User.findOne({
    where: {
      email,
    }
  });

  if (!user || user.password !== password) {
    throw new CustomError('NOT_FOUND', 'Invalid email or password');
  }

  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  login,
};
