const CustomError = require('../services/error/CustomError');

module.exports = async (req, _res, next) => {
  try {
    const admin = req.header('Admin');

    if (!admin) {
      throw new CustomError('UNAUTHORIZED', 'Admin only privileges');
    }

    return next();
  } catch (error) {
    next(error);
  }
};