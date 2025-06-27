// I believe this code defines our User model for the database
// It uses Sequelize, which is a tool that helps us work with databases

'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // This defines the User class that represents a user in our database
  class User extends Model {
    // This sets up relationships between users and other models
    static associate(models) {
      // A user can own multiple spots (like listings)
      User.hasMany(models.Spot, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        as: 'Owner',
        hooks: true
      })

      // A user can write multiple reviews
      User.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      })
    }
  }

  // This defines all the fields in our User model
  User.init({
    // Username field
    // Must be unique and between 4-30 characters
    // Cannot be an email address
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },

    // First name field
    // Must be between 2-30 characters
    // Cannot be an email address
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },

    // Last name field
    // Must be between 2-30 characters
    // Cannot be an email address
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },

    // Email field
    // Must be unique and a valid email address
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },

    // Password field
    // Stores a hashed version of the password for security
    // Always 60 characters long
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    // This hides sensitive information when we get user data
    // It won't show the password, email, or timestamps
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
  });
  return User;
};
