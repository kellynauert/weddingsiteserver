const { Sequelize } = require("sequelize");

const db = new Sequelize("weddingsite", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
