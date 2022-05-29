'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Follow.belongsTo(models.User, {
        as: 'follower',
        foreignKey: 'followerId',
      });

      models.Follow.belongsTo(models.User, {
        as: 'following',
        foreignKey: 'followingId',

      });
    }
  };
  Follow.init({
    followerId: DataTypes.INTEGER,
    followingId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};