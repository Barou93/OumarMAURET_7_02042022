'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId',

      });

      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId',

      });

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user',
      });

      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        targetKey: 'id',
        as: 'post',
      });
    }
  };
  Like.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    postId: {
      type: DataTypes.UUID,
      references: {
        model: 'Post',
        key: 'id'
      },

    },
    userId: {
      type: DataTypes.UUID,
      model: 'User',
      key: 'id'
    },

  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};