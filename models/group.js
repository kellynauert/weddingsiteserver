const { DataTypes } = require("sequelize");
const db = require("../db");

const group = db.define("group", {
  groupName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
});
module.exports = group;
