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

    }
  };
  Follow.init({

    followerId: {
      type: DataTypes.INTEGER,
      model: 'User',
      key: 'id'
    },
    followingId: {
      type: DataTypes.INTEGER,
      model: 'User',
      key: 'id'
    },

  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};