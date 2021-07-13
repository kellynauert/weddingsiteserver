const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
