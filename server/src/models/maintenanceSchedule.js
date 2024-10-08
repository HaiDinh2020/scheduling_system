'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaintenanceSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MaintenanceSchedule.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id', as: 'booking' });
    }
  }
  MaintenanceSchedule.init({
    booking_id: DataTypes.STRING,
    maintenanceTime: DataTypes.DATEONLY,
    note: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'MaintenanceSchedule',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return MaintenanceSchedule;
};