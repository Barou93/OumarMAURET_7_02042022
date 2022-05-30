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
      // define association hereMany
      models.Follow.belongsTo(models.User, {
        as: 'followers',
        foreignKey: 'followerId',
        onDelete: 'CASCADE'
      });

      models.Follow.belongsTo(models.User, {
        as: 'following',
        foreignKey: 'followingId',
        onDelete: 'CASCADE'
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