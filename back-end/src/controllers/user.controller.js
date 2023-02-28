const userService = require('../services/user.service');

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

module.exports = {
  login,
  createUser,
};