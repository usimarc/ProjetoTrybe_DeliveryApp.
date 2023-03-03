const Sequelize = require('sequelize');
const { Sale, SaleProduct } = require('../database/models');
const CustomError = require('./error/CustomError');
const config = require('../database/config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const saveNewSale = async (userId, sale) => {
  try {
    const { order: _, ...saleWithoutOrder } = sale;

    const saleId = await sequelize.transaction(async (t) => {
      const { dataValues: { id } } = await Sale.create({
        userId,
        ...saleWithoutOrder,
      }, { transaction: t });

      const items = sale.order.map((item) => ({
        saleId: id,
        ...item,
      }));
  
      await SaleProduct.bulkCreate(items, { transaction: t });
  
      return id;
    });

    return saleId;
  } catch (error) {
    throw new CustomError('BAD_REQUEST', error.message);
  }
};

module.exports = {
  saveNewSale,
};