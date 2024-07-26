'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Mechanic, { foreignKey: 'mechanic_id', targetKey: 'id', as: 'mechanic' });
      Appointment.belongsTo(models.Task, { foreignKey: 'task_id', targetKey: 'id', as: 'task' });
    }
  }
  Appointment.init({
    mechanic_id: DataTypes.STRING,
    task_id: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    status: DataTypes.ENUM('todo','in-progress', 'done'),
    createBy: DataTypes.ENUM('mechanic', 'customer', 'garage')
  }, {
    sequelize,
    modelName: 'Appointment',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Appointment;
};