require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();

app.use(require('./middleware/cors'));

const controllers = require('./controllers');

app.use(Express.json());

app.use('/user', controllers.User);
app.use('/guest', controllers.Guest);
app.use('/group', controllers.Group);
app.use('/plusone', controllers.PlusOne);

db.authenticate()
  .then(() =>
    db
      .sync
      // { force: true }
      ()
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
