const { Sequelize } = require('sequelize');

// const db = new Sequelize("weddingsite", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // very important
    },
  },
});

// Comment out line 10 to run locally
// sequelize.authenticate().then(
//   function () {
//     console.log('Connected to Wedding Site postgres database');
//   },
//   function (err) {
//     console.log(err);
//   }
// );

module.exports = db;
