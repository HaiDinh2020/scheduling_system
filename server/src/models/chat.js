'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Chat.belongsTo(models.User, { foreignKey: 'sender_id', targetKey: 'id', as: 'sender' });
            Chat.belongsTo(models.User, { foreignKey: 'receiver_id', targetKey: 'id', as: 'receiver' });
        }
    }
    Chat.init({
        sender_id: DataTypes.STRING,
        receiver_id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Chat',
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    return Chat;
};