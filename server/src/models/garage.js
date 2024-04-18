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
      Garage.belongsTo(models.User, {foreignKey: 'owner_id', targetKey: 'id', as: 'user'})
    }
  }
  Garage.init({
    garage_name: DataTypes.STRING,
    address: DataTypes.STRING,
    introduce: DataTypes.STRING,
    website: DataTypes.STRING,
    business_hours: DataTypes.STRING,
    services: DataTypes.STRING,
    star: DataTypes.NUMBER,
    image: DataTypes.STRING,
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Garage',
  });
  return Garage;
};