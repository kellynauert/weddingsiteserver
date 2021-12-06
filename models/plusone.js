const { DataTypes } = require('sequelize');
const db = require('../db');

const plusone = db.define('plusone', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  drinking: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  vegetarian: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  beer: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  wine: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  cider: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  mead: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});
module.exports = plusone;
