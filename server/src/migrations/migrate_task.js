'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tasks', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            task_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            garage_id: {
                type: Sequelize.STRING,
                references: {
                    model: 'Garages',
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
            },
            assign_to: {
                type: Sequelize.STRING,
                references: {
                    model: 'Engineers',
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE'
            },
            level: {
                type: Sequelize.ENUM("easy", "medium", "hard"),
                defaultValue: "easy"
            },
            task_status: {
                type: Sequelize.ENUM("pending", "in_progress", "completed"),
                defaultValue: "pending"
            },
            allocation_date: {
                type: Sequelize.DATEONLY
            },
            estimated_time: {
                type: Sequelize.INTEGER,
                defaultValue: 60
            },
            start_date: {
                type: Sequelize.DATEONLY,
                
            },
            start_time: {
                type: Sequelize.TIME,
                
            },
            end_date: {
                type: Sequelize.DATEONLY,
                
            },
            end_time: {
                type: Sequelize.TIME,
               
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
        await queryInterface.dropTable('Tasks');
    }
};