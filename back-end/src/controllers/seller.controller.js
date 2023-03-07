const sellerService = require('../services/seller.service');

const getAll = async (_req, res, next) => {
  try {
    const sellers = await sellerService.getAll();
    return res.status(200).json(sellers);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
};