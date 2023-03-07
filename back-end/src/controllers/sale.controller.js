const saleService = require('../services/sale.service');

const create = async (req, res, next) => {
  try {
    const saleId = await saleService.saveNewSale(req.user.id, req.body);
    return res.status(201).json(saleId);
  } catch (error) {
    return next(error);
  }
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const output = await saleService.getSaleById(id);
    return res.status(200).json(output);
  } catch (error) {
    return next(error);
  }
};

const updateSale = async (req, res, next) => {
  const { body } = req;
  try {
    await saleService.updateSale(body);
    return res.status(204).send({ message: 'was updated' });
  } catch (error) {
    return next(error);
  }
};

const getAllSalesByUser = async (req, res, next) => {
  try {
    const output = await saleService.getAllSalesByUser(req.user.id);
    return res.status(200).json(output);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAllSalesByUser,
  updateSale,
  getSaleById,
};