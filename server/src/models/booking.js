'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'customer_id', targetKey: 'id', as: 'customer' });

      Booking.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'garage' });
      Booking.belongsTo(models.Car, { foreignKey: 'car_id', targetKey: 'id', as: 'car' });

    }
  }
  Booking.init({
    customer_id: DataTypes.STRING,
    garage_id: DataTypes.STRING,
    car_id: DataTypes.STRING,
    status: DataTypes.STRING,
    services: DataTypes.STRING,
    description: DataTypes.STRING,
    booking_images: DataTypes.STRING,
    booking_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Booking',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Booking;
};