'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Garage, { foreignKey: 'garage_id', targetKey: 'id', as: 'garage' });
      Invoice.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id', as: 'booking' });
      Invoice.hasMany(models.Transaction, { foreignKey: 'invoice_id', as: 'transactions' });
      Invoice.belongsTo(models.GaragePaymentConfig, { foreignKey: 'garage_id', targetKey: 'garage_id', as: 'paymentConfig' });
    }
  }
  Invoice.init({
    garage_id: DataTypes.STRING,
    booking_id: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING,
    invoice_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Invoice;
};