'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNulll: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNulll: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
      },
      sellerId: {
        type: Sequelize.STRING,
        allowNulll: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'seller_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        allowNulll: false,
        field: 'total_price',
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNulll: false,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        allowNulll: false,
        field: 'delivery_number',
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNulll: false,
        field: 'sale_date',
      },
      status: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};