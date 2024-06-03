'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Garages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      garage_name: {
        type: Sequelize.STRING
      },
      garageAddress: {
        type: Sequelize.STRING
      },
      exactAddress: {
        type: Sequelize.STRING
      },
      introduce: {
        type: Sequelize.TEXT
      },
      website: {
        type: Sequelize.STRING
      },
      business_hours: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.TEXT
      },
      owner_id: {
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
    await queryInterface.dropTable('Garages');
  }
};