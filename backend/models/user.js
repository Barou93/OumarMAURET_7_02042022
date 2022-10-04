'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post);

      models.User.hasMany(models.Conversation, {
        foreignKey: 'sender'
      });
      models.User.hasMany(models.Conversation, {
        foreignKey: 'receiver'
      });


      models.User.hasMany(models.Follow, {
        foreignKey: 'followerId',
        as: 'follower'

      });

      models.User.hasMany(models.Follow, {
        foreignKey: 'followingId',
        as: 'following'

      });


      models.User.belongsToMany(models.Forum, {
        through: models.ForumMember,
        foreignKey: 'userId',
        otherKey: 'forumId',
        as: 'members'

      });

      models.Forum.belongsToMany(models.User, {
        through: models.ForumMessage,
        foreignKey: 'forumId',
        otherKey: 'userId',
        as: 'parrticipants',
      });
      //models.User.hasMany(models.ForumMessage);
    }
  };
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    coverPicture: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};