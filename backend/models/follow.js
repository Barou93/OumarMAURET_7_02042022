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
<<<<<<< HEAD
      // define association here
      models.Follow.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,

        }
      })
    }
  };
  Follow.init({
    userId: DataTypes.INTEGER,
    userFollowers: DataTypes.INTEGER,
    userFollowings: DataTypes.INTEGER
=======
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

>>>>>>> feature/followsFeature
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};