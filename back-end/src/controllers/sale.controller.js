const saleService = require('../services/sale.service');

const create = async (req, res, next) => {
  try {
    const saleId = await saleService.saveNewSale(req.user.id, req.body);
    return res.status(201).json(saleId);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
};