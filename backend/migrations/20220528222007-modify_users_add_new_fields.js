'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([

      queryInterface.addColumn(
        'Users',
        'followers', {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ),
      queryInterface.addColumn(
        'Users',
        'following',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      )
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'followers'),
      queryInterface.removeColumn('Users', 'following'),
    ])
  }
};
