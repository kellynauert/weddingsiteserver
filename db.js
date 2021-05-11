const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op.Aliases,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // very important
    },
  },
});

// Comment out lines 6-11 to run locally

module.exports = db;
