'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Forum.belongsToMany(models.User, {
        through: models.ForumMember,
        foreignKey: 'forumId',
        otherKey: 'userId',
        as: 'groups'
      });
      models.User.belongsToMany(models.Forum, {
        through: models.ForumMessage,
        foreignKey: 'userId',
        otherKey: 'forumId',
        as: 'forums',
      });
    }
  };
  Forum.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    createByUserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Forum',
  });
  return Forum;
};