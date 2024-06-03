'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GaragePaymentConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GaragePaymentConfig.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'belong_garage' });
    }
  }
  GaragePaymentConfig.init({
    garage_id: DataTypes.STRING,
    vnp_TmnCode: DataTypes.STRING,
    vnp_HashSecret: DataTypes.STRING,
    vnp_ReturnUrl: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'GaragePaymentConfig',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return GaragePaymentConfig;
};