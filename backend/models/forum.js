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
      models.Forum.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Forum.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    create_by_userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Forum',
  });
  return Forum;
};