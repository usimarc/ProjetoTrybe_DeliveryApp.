'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNulll: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNulll: false,
      },
      urlImage: {
        type: Sequelize.STRING,
        allowNulll: false,
        field: 'url_image',
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('products');
  }
};