'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defautValue: Sequelize.UUIDV4
      },
      conversationId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Conversations',
          key: 'id'
        },
        onDelete: 'CASCADE'

      },
      senderId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isRead: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Messages');
  }
};