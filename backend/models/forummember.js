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
    forumId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Forum',
        key: 'id'
      },
      onDelete: 'CASCADE',

    },
    userId: {
      type: DataTypes.INTEGER,
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