'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ForumMembers', {
      id: {
       allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defautValue: Sequelize.UUIDV4
      },
      forumId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Forums',
          key: 'id'
        },
        onDelete: 'CASCADE',

      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ForumMembers');
  }
};