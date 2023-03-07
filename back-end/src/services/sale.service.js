const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Sale, SaleProduct, Product, User } = require('../database/models');
const CustomError = require('./error/CustomError');
const config = require('../database/config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const saveNewSale = async (userId, sale) => {
  try {
    const { order: _, ...saleWithoutOrder } = sale;

    const saleId = await sequelize.transaction(async (t) => {
      const { dataValues: { id } } = await Sale.create(
        { userId, ...saleWithoutOrder },
        { transaction: t },
      );

      const items = sale.order.map((item) => ({ saleId: id, ...item }));
  
      await SaleProduct.bulkCreate(items, { transaction: t });
  
      return id;
    });

    return saleId;
  } catch (error) {
    throw new CustomError('BAD_REQUEST', error.message);
  }
};

const mapProduct = (product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  quantity: product.SaleProduct.quantity,
  urlImage: product.urlImage,
});

const objectMapping = (sales) => sales.map((order) => ({
    id: order.id,
    totalPrice: order.totalPrice,
    deliveryAddress: order.deliveryAddress,
    deliveryNumber: order.deliveryNumber,
    saleDate: order.saleDate,
    status: order.status,
    sellerName: order.sellersSale.name,
    sellerEmail: order.sellersSale.email,
    products: order.products.map((product) => mapProduct(product)),
  }));

const getAllSalesByUser = async (user) => {
  const sales = await Sale.findAll({
    where: { [Op.or]: [
      { userId: user },
      { sellerId: user },
    ] },
    attributes: { exclude: ['userId', 'sellerId'] },
    include: [
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
      { model: User, as: 'sellersSale', attributes: { exclude: ['password'] } },
    ],
  });

  return objectMapping(sales);
};

module.exports = {
  saveNewSale,
  getAllSalesByUser,
};