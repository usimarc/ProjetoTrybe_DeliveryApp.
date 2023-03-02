const CustomError = require('../services/error/CustomError');
const { verifyToken } = require('../auth/token');

module.exports = async (req, _res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      throw new CustomError('UNAUTHORIZED', 'Token not found');
    }

    const { data } = await verifyToken(token);

    req.user = data;

    return next();
  } catch (error) {
    next(error);
  }
};