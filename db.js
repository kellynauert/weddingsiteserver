const { Sequelize } = require('sequelize');

let options = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op.Aliases,
  dialectOptions: process.env.PORT === '3000' ? null : options,
});
// Comment out lines 6-11 to run locally

module.exports = db;
