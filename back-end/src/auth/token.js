const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const { join } = require('path');
const CustomError = require('../services/error/CustomError');

const getSecretKey = async () => {
  const path = join(__dirname, '../../jwt.evaluation.key');

  try {
    const secretKey = await fs.readFile(path, { encoding: 'utf-8' });
    return secretKey;
  } catch (error) {
    console.error(error.message);
  }
};

const createToken = async (user) => {
  const secretKey = await getSecretKey();
  const config = {
    expiresIn: '5h',
    algorithm: 'HS256',
  };

  return jwt.sign({ data: user }, secretKey, config);
};

const verifyToken = async (token) => {
  try {
    const secretKey = await getSecretKey();
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new CustomError('UNAUTHORIZED', error.message);
  }
};

module.exports = {
  createToken,
  verifyToken,
};