const { Router } = require('express');
const { User } = require('../models');
const router = Router();

const validateSession = (req, res, next) => {
  router.use(async (req, res, next) => {
    const user = await User.findFirst({ where: { id: req.session.userId } });
    req.user = user;
    next();
  });
};
module.exports = validateSession;
