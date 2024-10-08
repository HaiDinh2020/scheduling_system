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
      BookingGarage.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'garage' });
      BookingGarage.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id', as: 'booking' });
    }
  }
  BookingGarage.init({
    booking_id: DataTypes.STRING,
    garage_id: DataTypes.STRING,
    status: DataTypes.ENUM("accepted", "rejected", "pending")
  }, {
    sequelize,
    modelName: 'BookingGarage',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return BookingGarage;
};