'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Invoice, { foreignKey: 'invoice_id', targetKey: 'id', as: 'invoice' });
    }
  }
  Transaction.init({
    invoice_id: DataTypes.STRING,
    transaction_id: DataTypes.STRING,       // do vnpay cung cấp
    amount: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transaction',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Transaction;
};