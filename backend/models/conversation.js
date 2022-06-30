'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      models.Conversation.hasMany(models.Message);
      models.Conversation.belongsTo(models.User, { as: 'senderUser', foreignKey: 'sender' });
      models.Conversation.belongsTo(models.User, { as: 'recipient', foreignKey: 'receiver' });


    }
  };
  Conversation.init({
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};