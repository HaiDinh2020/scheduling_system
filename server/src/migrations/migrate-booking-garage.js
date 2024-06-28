'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BookingGarages', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            booking_id: {
                type: Sequelize.STRING,
            },
            garage_id: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM('accepted', 'rejected', 'pending'),
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
        await queryInterface.dropTable('BookingGarages');
    }
};