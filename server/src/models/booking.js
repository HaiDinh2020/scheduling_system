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
    }
  }
  Booking.init({
    customer_id: DataTypes.STRING,
    garage_id: DataTypes.STRING,
    status: DataTypes.STRING,
    booking_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Booking;
};