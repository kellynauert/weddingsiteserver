const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');
const validateSession = require('../middleware/validate-session');
const { validate } = require('../db');

const router = Router();

router.post('/create', function (req, res) {
  User.create({
    username: req.body.username,
    passwordhash: bcrypt.hashSync(req.body.password, 13),
    role: req.body.role,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      res.json({
        user: user,
        message: 'User Created',
        sessionToken: token,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
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
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                {
                  expiresIn: 60 * 60 * 24,
                }
              );
              res.status(200).json({
                user: user,
                message: 'User Successfully Logged in!',
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: 'Login Failed' });
            }
          }
        );
      } else {
        res.status(500).json({ error: 'User does not exist' });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
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
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:id', validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id },
  };

  User.findOne(query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
