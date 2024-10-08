'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GaragePaymentConfigs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      garage_id: {
        type: Sequelize.STRING
      },
      vnp_TmnCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vnp_HashSecret: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vnp_ReturnUrl: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GaragePaymentConfigs');
  }
};