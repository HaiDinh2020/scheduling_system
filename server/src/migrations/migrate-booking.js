'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.STRING
      },
      garage_id: {
        type: Sequelize.STRING
      },
      car_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      booking_images: {
        type: Sequelize.STRING
      },
      booking_date: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      exactAddress: {
        type: Sequelize.STRING
      },
      pickupOption: {
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
    await queryInterface.dropTable('Bookings');
  }
};