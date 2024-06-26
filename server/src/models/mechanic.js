'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mechanic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mechanic.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
      Mechanic.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'garage'})
      
      Mechanic.hasMany(models.Appointment, { foreignKey: 'mechanic_id', as: 'appointments' });
    }
  }
  Mechanic.init({
    garage_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    major: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Mechanic',
  });
  return Mechanic;
};