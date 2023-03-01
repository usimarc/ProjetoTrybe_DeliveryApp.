const md5 = require('md5');
const { Op } = require('sequelize');
const { createToken } = require('../auth/token');
const { User } = require('../database/models');
const CustomError = require('./error/CustomError');
const validations = require('./validations');

const findUserByEmailOrName = async (email, name) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email },
        { name },
      ],
    },
  });

  return user;
};

const login = async ({ email, password }) => {
  validations.login(email, password);

  const user = await findUserByEmailOrName(email, '');

  const hash = md5(password);

  if (!user || user.password !== hash) {
    throw new CustomError('NOT_FOUND', 'Invalid email or password');
  }

  const token = await createToken({ email, name: user.dataValues.name });

  return {
    name: user.dataValues.name,
    email,
    role: user.dataValues.role,
    token,
  };
};

const register = async ({ name, email, password }) => {
  validations.createUser(name, email, password);

  const hash = md5(password);

  const userAlreadyExists = await findUserByEmailOrName(email, name);

  if (userAlreadyExists) {
    throw new CustomError('CONFLICT', 'User Already Exists');
  }

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
