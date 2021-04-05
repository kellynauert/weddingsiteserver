const { DataTypes } = require('sequelize');
const db = require('../db');

const guest = db.define('guest', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  attending: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  over21: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  drinking: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  diet: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  plusOneId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  plusOneAllowed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});
module.exports = guest;
