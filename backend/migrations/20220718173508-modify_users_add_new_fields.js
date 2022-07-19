'use strict';



module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'followers', {
        type: Sequelize.UUID,
        allowNull: true,
      }
      ),

      queryInterface.addColumn(
        'Users',
        'following', {
        type: Sequelize.UUID,
        allowNull: true,
      }
      ),
      queryInterface.addColumn(
        'Users',
        'isAdmin', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      }
      ),
      queryInterface.addColumn(
        'Users',
        'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
      }
      ),
      queryInterface.addColumn(
        'Users',
        'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
      }
      ),

    ])
  },

  async down(queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.removeColumn('Users', 'followers'),
      queryInterface.removeColumn('Users', 'following'),
      queryInterface.removeColumn('Users', 'isAdmin'),
      queryInterface.removeColumn('Users', 'createdAt'),
      queryInterface.removeColumn('Users', 'updatedAt'),
    ])

  }
};
