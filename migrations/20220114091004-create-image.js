'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageID: {
        type: Sequelize.STRING
      },
      sol: {
        type: Sequelize.INTEGER
      },
      earth_date: {
        type: Sequelize.STRING
      },
      camera: {
        type: Sequelize.STRING
      },
      mission: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Images');
  }
};