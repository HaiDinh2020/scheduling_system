'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Garage, { foreignKey: 'owner_id', as: 'garage' })
      User.hasOne(models.FirebaseToken, { foreignKey: 'user_id', as: 'firebasetoken' })
      User.hasMany(models.Car, { foreignKey: 'owner_id', as: 'cars' });
      User.hasMany(models.Booking, { foreignKey: 'customer_id', as: 'bookings' });
      User.hasMany(models.Message, { foreignKey: 'sender_id', as: 'senders'})
      User.hasMany(models.Message, { foreignKey: 'receiver_id', as: 'receivers'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return User;
};