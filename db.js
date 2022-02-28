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

module.exports = db;
