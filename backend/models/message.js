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
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    conversationId: DataTypes.UUID,
    senderId: DataTypes.UUID,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};