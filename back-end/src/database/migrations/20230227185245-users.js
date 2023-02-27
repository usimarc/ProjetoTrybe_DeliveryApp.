'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNulll: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNulll: false,
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  }
};