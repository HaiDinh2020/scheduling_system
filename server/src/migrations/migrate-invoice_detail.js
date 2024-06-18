'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('InvoiceDetails', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            invoice_id: {
                type: Sequelize.STRING,
            },
            item_description: {
                type: Sequelize.TEXT
            },
            unit: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER,
            },
            unit_price: {
                type: Sequelize.DECIMAL(10, 2),
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
        await queryInterface.dropTable('InvoiceDetails');
    }
};