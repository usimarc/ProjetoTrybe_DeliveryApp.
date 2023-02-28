const md5 = require('md5');
const { User } = require('../database/models');
const CustomError = require('./error/CustomError');
const validations = require('./validations');

const login = async ({ email, password }) => {
  validations.login(email, password);

  const user = await User.findOne({
    where: {
      email,
    },
  });

  const hash = md5(password);

  if (!user || user.password !== hash) {
    throw new CustomError('NOT_FOUND', 'Invalid email or password');
  }

  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const register = async ({ name, email, password }) => {
  validations.createUser(name, email, password);
  const hash = md5(password);
  const newUser = await User.create({
    name,
    email,
    password: hash,
    role: 'customer',
  });

  return {
    name: newUser.dataValues.name,
    email: newUser.dataValues.email,
    role: newUser.dataValues.role,
  };
};

module.exports = {
  login,
  register,
};
