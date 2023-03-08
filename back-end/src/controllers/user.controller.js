const userService = require('../services/user.service');

const getAllUsers = async (_req, res, next) => {
  try {
    const output = await userService.getAllUsers();
    return res.status(200).json(output);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const output = await userService.login(req.body);
    return res.status(200).json(output);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const output = await userService.register(req.body);
    return res.status(201).json(output);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isDeleted = await userService.deleteUser(id);
    return res.status(200).send(isDeleted);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  deleteUser,
};