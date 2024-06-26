'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Appointments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            mechanic_id: {
                type: Sequelize.STRING,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            startTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('require', 'scheduled', 'completed', 'canceled'),
                defaultValue: 'scheduled'
            },
            createBy: {
                type: Sequelize.ENUM('mechanic', 'customer', 'garage'),
                defaultValue: 'mechanic'
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
        await queryInterface.dropTable('Appointments');
    }
};