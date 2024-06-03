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
      Appointment.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'garage' });
    }
  }
  Appointment.init({
    garage_id: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    status: DataTypes.ENUM('scheduled', 'completed', 'canceled'),
  }, {
    sequelize,
    modelName: 'Appointment',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Appointment;
};