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

const handleToken = async (userWithoutPassword) => {
  const token = await createToken(userWithoutPassword);

  return {
    name: userWithoutPassword.name,
    email: userWithoutPassword.email,
    role: userWithoutPassword.role,
    token,
  };
};

const login = async ({ email, password }) => {
  validations.login(email, password);

  const user = await findUserByEmailOrName(email, '');

  const hash = md5(password);

  if (!user || user.password !== hash) {
    throw new CustomError('NOT_FOUND', 'Invalid email or password');
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  return handleToken(userWithoutPassword);
};

const register = async ({ name, email, password, role }) => {
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
    role,
  });

  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  return handleToken(userWithoutPassword);
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
    where: {
      role: { [Op.ne]: 'administrator' },
    },
  });

  return allUsers;
};

const deleteUser = async (userId) => {
  const userIsExists = await User.findOne({
    where: { id: userId },
  });
    if (!userIsExists) {
      throw new CustomError('NOT_FOUND', 'User not found');
    }

    await userIsExists.destroy();

    return { message: 'User deleted successfully' };
};

module.exports = {
  login,
  register,
  getAllUsers,
  deleteUser,
};
