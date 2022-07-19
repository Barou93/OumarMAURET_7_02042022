'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumMember extends Model {

    static associate(models) {


    }
  };
  ForumMember.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    forumId: {
      type: DataTypes.UUID,
      references: {
        model: 'Forum',
        key: 'id'
      },
      onDelete: 'CASCADE',

    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'ForumMember',
  });
  return ForumMember;
};