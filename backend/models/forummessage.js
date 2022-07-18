'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  ForumMessage.init({
    forumId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Forum',
        key: 'id'
      },
      onDelete: 'CASCADE',

    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ForumMessage',
  });
  return ForumMessage;
};