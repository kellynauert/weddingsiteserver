const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');
const validateSession = require('../middleware/validate-session');
const { validate } = require('../db');
const validator = require('validator');

const router = Router();

router.post('/create', function (req, res) {
  query = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!validator.isByteLength(query.password, { min: 8, max: 24 })) {
    res.status(400).json({
      statusText: 'Must be between 8-24 characters',
      field: 'password',
    });
  } else if (validator.isAlphanumeric(query.password)) {
    res.status(400).json({
      statusText: 'Must include at least 1 special character',
      field: 'password',
    });
  } else if (!validator.isByteLength(query.username, { min: 4, max: 20 })) {
    res.status(400).json({
      statusText: 'Must be between 4-20 characters.',
      field: 'username',
    });
  } else if (!validator.isAlphanumeric(query.username)) {
    res.status(400).json({
      statusText: 'Can not include special characters.',
      field: 'username',
    });
  } else
    User.create({
      username: req.body.username,
      passwordhash: bcrypt.hashSync(req.body.password, 13),
      role: req.body.role,
    })
      .then(function createSuccess(user) {
        let token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: 60 * 60 * 24,
          }
        );
        res.json({
          user: user,
          statusText: 'User Successfully Logged in!',
          sessionToken: token,
        });
      })
      .catch(function (err) {
        res.status(500).json({ statusText: err.errors[0].message });
      });
});

router.post('/login', function (req, res) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.passwordhash,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                {
                  expiresIn: 60 * 60 * 72,
                }
              );
              res.status(200).json({
                user: user,
                statusText: 'User Successfully Logged in!',
                sessionToken: token,
              });
            } else {
              res
                .status(502)
                .send({ statusText: 'Incorrect Password', field: 'password' });
            }
          }
        );
      } else {
        res
          .status(500)
          .json({ statusText: 'User does not exist', field: 'username' });
      }
    })
    .catch((err) =>
      res.status(500).json({ statusText: err.errors[0].message })
    );
});

router.get('/role', function (req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .send({ auth: false, statusText: 'No Token Provided' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (!err && decodeToken) {
        res
          .status(200)
          .json({ role: decodeToken.role, username: decodeToken.username });
      } else {
        req.errors = err;
        return res.status(500).json({ statusText: 'Not Authorized' });
      }
    });
  }
});

router.put('/:id', validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id, id: req.user.id },
  };
  const userEntry = {
    username: req.body.username,
    role: req.body.role,
  };

  User.update(userEntry, query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(500).json({ statusText: err.errors[0].message })
    );
});

router.get('/:id', validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id },
  };

  User.findOne(query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(500).json({ statusText: err.errors[0].message })
    );
});
module.exports = router;
