const CustomError = require('../services/error/CustomError');
const { verifyToken } = require('../auth/token');

module.exports = async (req, _res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    throw new CustomError('UNAUTHORIZED', 'Token not found');
  }

  const { error, data } = verifyToken(token);

  if (error) {
    throw new CustomError('UNAUTHORIZED', 'Expired or invalid token');
  }

  req.user = data;

  return next();
};