'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'garage' });
      Task.belongsTo(models.Mechanic, { foreignKey: 'assign_to', targetKey: 'id', as: 'assignto'} )
      Task.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id', as: 'belong_booking' })
    }
  }
  Task.init({   // thêm trường booking_id để xem là task từ customer booking
    task_name: DataTypes.STRING,
    garage_id: DataTypes.STRING,
    booking_id: DataTypes.STRING,
    assign_to: DataTypes.STRING,
    level: DataTypes.ENUM('easy', 'medium', 'hard'),
    task_status: DataTypes.ENUM('pending', 'assigned', 'in_progress', 'completed'),
    allocation_date: DataTypes.DATEONLY,
    estimated_time: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    start_time: DataTypes.TIME,
    end_date: DataTypes.DATEONLY,
    end_time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Task',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });
  return Task;
};