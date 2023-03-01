const productService = require('../services/product.service');

const getall = async (_req, res, next) => {
  try {
    const output = await productService.getAllProducts();
    return res.status(200).json(output);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getall,
}