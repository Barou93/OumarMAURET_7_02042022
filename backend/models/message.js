'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        as: 'sender',
        foreignKey: 'senderId'
      });

      models.Message.belongsTo(models.Conversation);

    }
  };
  Message.init({
    conversationId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};