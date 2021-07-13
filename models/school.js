const { DataTypes } = require('sequelize');
const db = require('../db');

const School = db.define('school', {
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schoolAbbreviation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schoolGroup: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  accessCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = School;
