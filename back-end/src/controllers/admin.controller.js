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

module.exports = {
  createUser,
};