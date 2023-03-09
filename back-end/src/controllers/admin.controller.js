const userService = require('../services/user.service');
const isAdmin = require('../services/validations/isAdmin');

const createUser = async (req, res, next) => {
  try {
    isAdmin(req.user.role);
    const { token: _, ...userWithoutToken } = await userService.register(req.body);
    return res.status(201).json(userWithoutToken);
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const output = await userService.getAllUsers();
    return res.status(200).json(output);
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
  createUser,
  getAllUsers,
  deleteUser,
};