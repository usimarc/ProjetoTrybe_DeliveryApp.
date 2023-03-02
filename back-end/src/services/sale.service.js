const { Sale, SaleProduct } = require('../database/models');

const saveNewSale = async (userId, sale) => {
  const { order: _, ...saleWithoutOrder } = sale;

  const { dataValues: { id } } = await Sale.create({ userId, ...saleWithoutOrder });

  const items = sale.order.map((item) => ({
    saleId: id,
    ...item,
  }));

  await SaleProduct.bulkCreate(items);

  return id;
};

module.exports = {
  saveNewSale,
};