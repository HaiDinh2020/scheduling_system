'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Message.belongsTo(models.User, { foreignKey: 'sender_id', targetKey: 'id', as: 'sender' });
            Message.belongsTo(models.User, { foreignKey: 'receiver_id', targetKey: 'id', as: 'receiver' });
        }
    }
    Message.init({
        sender_id: DataTypes.STRING,
        receiver_id: DataTypes.STRING,
        content: DataTypes.STRING,
        timestamp: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Message',
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    return Message;
};