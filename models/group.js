const { DataTypes } = require('sequelize');
const db = require('../db');

const group = db.define('group', {
  groupName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  children: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  childrenAttending: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
module.exports = group;
