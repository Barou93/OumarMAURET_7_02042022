'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'coverPicture', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: './uploads/profil/cover-picture.png'
      }
      ),
      queryInterface.addColumn(
        'Users',
        'isAdmin', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
      queryInterface.removeColumn('Users', 'coverPicture'),
      queryInterface.removeColumn('Users', 'isAdmin'),
      queryInterface.removeColumn('Users', 'createdAt'),
      queryInterface.removeColumn('Users', 'updatedAt'),
    ])
  }
};
