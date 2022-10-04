'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defautValue: Sequelize.UUIDV4,
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [2, 255]
        }
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [2, 255]
        }
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
        defaultValue: './uploads/profil/user.png'
      },

      coverPicture: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: './uploads/profil/cover-picture.png'
      },

      bio: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          len: [8, 110],
          notEmpty: true
        },
        followers: {
          allowNull: true,
          type: Sequelize.UUID,
        },
        following: {
          allowNull: true,
          type: Sequelize.UUID,
        },

        isAdmin: {
          allowNull: true,
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

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};