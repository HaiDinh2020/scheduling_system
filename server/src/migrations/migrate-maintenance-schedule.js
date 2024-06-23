'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('MaintenanceSchedules', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            booking_id: {
                type: Sequelize.STRING,
            },
            maintenanceTime: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            note: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('MaintenanceSchedules');
    }
};