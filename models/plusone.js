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
  attending: {
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
});
module.exports = plusone;
