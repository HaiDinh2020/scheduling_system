'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Garage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Garage.belongsTo(models.User, { foreignKey: 'owner_id', targetKey: 'id', as: 'user' })

      Garage.hasMany(models.Booking, { foreignKey: 'garage_id', as: 'bookings' });
      Garage.hasOne(models.GaragePaymentConfig, { foreignKey: 'garage_id', as: 'garage_payment' })
      Garage.hasMany(models.Appointment, { foreignKey: 'garage_id', as: 'appointments'})
    }
  }
  Garage.init({
    garage_name: DataTypes.STRING,
    garageAddress: DataTypes.STRING,
    exactAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    introduce: DataTypes.STRING,
    website: DataTypes.STRING,
    business_hours: DataTypes.STRING,
    services: DataTypes.STRING,
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    images: DataTypes.STRING,
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Garage',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Garage;
};