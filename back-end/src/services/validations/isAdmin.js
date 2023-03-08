const CustomError = require("../error/CustomError");

const isAdmin = (role) => {
  if (role !== 'administrator') {
    throw new CustomError('UNAUTHORIZED', 'Unauthorized user');
  }
};

module.exports = isAdmin;