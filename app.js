require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();

app.use(require('./middleware/cors'));

const controllers = require('./controllers');

app.use(Express.json({ limit: '50mb' }));

app.use('/user', controllers.User);
app.use('/student', controllers.Student);
app.use('/school', controllers.School);

db.authenticate()
  .then(
    // () => db.sync({ force: true })
    () => db.sync()
  )
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log('[server]: Server Crashed');
    console.log(e);
  });
