'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingGarage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  BookingGarage.init({
    booking_id: DataTypes.STRING,
    garage_id: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'BookingGarage',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return BookingGarage;
};