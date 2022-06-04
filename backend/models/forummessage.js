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
      models.User.belongsToMany(models.Forum, {
        through: models.ForumMessage,
        foreignKey: 'userId',
        otherKey: 'forumId',
      });

      models.Forum.belongsToMany(models.User, {
        through: models.ForumMessage,
        foreignKey: 'forumId',
        otherKey: 'userId',
      });

      models.ForumMessage.belongsTo(models.Forum, {
        as: 'forum',
        foreignKey: 'forumId'
      });
      models.ForumMessage.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      })
    }
  };
  ForumMessage.init({
    forumId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ForumMessage',
  });
  return ForumMessage;
};