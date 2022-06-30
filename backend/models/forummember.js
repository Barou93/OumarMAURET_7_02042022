'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumMember extends Model {

    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Forum, {
        through: models.ForumMember,
        foreignKey: 'userId',
        otherKey: 'forumId',
      });

      models.Forum.belongsToMany(models.User, {
        through: models.ForumMember,
        foreignKey: 'forumId',
        otherKey: 'userId',
      });

      models.ForumMember.belongsTo(models.Forum, {
        as: 'forum',
        foreignKey: 'forumId'
      });
      models.ForumMember.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      })
    }
  };
  ForumMember.init({
    forumId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ForumMember',
  });
  return ForumMember;
};