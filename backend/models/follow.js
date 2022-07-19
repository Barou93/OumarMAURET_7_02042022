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
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    followerId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    followingId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id'
      }
    }


  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};