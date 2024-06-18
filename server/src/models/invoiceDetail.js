'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceDetail.belongsTo(models.Invoice, { foreignKey: 'invoice_id', targetKey: 'id', as: 'belong_invoice' });
      
    }
  }
  InvoiceDetail.init({
    invoice_id: DataTypes.STRING,
    item_description: DataTypes.STRING,
    unit: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL(10, 2),
  }, {
    sequelize,
    modelName: 'InvoiceDetail',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return InvoiceDetail;
};