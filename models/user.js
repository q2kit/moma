'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
    static async hashPassword(password) {
      return await bcrypt.hash(password, 10);
    }
    generateToken() {
      return jwt.sign({
        username: this.username,
        is_admin: this.is_admin
      }, process.env.JWT_SECRET_KEY, {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        is: /^[a-zA-Z0-9_]+$/i,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'User',
  });
  return User;
};