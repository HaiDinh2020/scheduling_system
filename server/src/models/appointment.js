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
      Appointment.belongsTo(models.Engineer, { foreignKey: 'engineer_id', targetKey: 'id', as: 'engineer' });
    }
  }
  Appointment.init({
    engineer_id: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    status: DataTypes.ENUM('require','scheduled', 'completed', 'canceled'),
    createBy: DataTypes.ENUM('engineer', 'customer', 'garage')
  }, {
    sequelize,
    modelName: 'Appointment',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Appointment;
};