'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, { foreignKey: 'owner_id', targetKey: 'id', as: 'owner' });
      Car.hasMany(models.Booking, { foreignKey: 'car_id', as: 'bookings' });
    }
  }
  Car.init({
    model: DataTypes.STRING,
    number_plate: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    make: DataTypes.STRING,
    car_images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};