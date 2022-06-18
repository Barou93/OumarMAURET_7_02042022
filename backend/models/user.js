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
      models.User.hasMany(models.Message);
      models.User.belongsToMany(models.User, {
        foreignKey: 'followerId',
        as: 'followers',
        through: models.Follow
      });
      models.User.belongsToMany(models.User, {
        foreignKey: 'followingId',
        as: 'followings',
        through: models.Follow
      });
      models.User.hasMany(models.Forum);
      models.User.hasMany(models.ForumMember);
      models.User.hasMany(models.ForumMessage);
    }
  };
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};