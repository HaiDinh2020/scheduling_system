'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Engineer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Engineer.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
      Engineer.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'garage'})
      
      Engineer.hasMany(models.Appointment, { foreignKey: 'engineer_id', as: 'appointments' });
    }
  }
  Engineer.init({
    garage_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    major: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Engineer',
  });
  return Engineer;
};