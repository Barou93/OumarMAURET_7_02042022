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
      models.Message.belongsTo(models.User, {
<<<<<<< HEAD
        foreignKey: {
          allowNull: false,

        }
=======
        as: 'sender',
        foreignKey: 'senderId'
      });
      models.Message.belongsTo(models.User, {
        as: 'receiver',
        foreignKey: 'receiverId'
>>>>>>> feature/followsFeature
      })
    }
  };
  Message.init({
<<<<<<< HEAD
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
=======
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.STRING
>>>>>>> feature/followsFeature
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};