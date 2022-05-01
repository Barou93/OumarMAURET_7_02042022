'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        }

      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      picture: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '../frontend/public/uploads/profil/user.png'
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          len: [15, 380],
          notEmpty: true
        },
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Users');
  }
};