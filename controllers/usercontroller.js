const { Router } = require('express');
const validateSession = require('../middleware/validate-session');
const { User } = require('../models');

const router = Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.post('/api/v1/auth/google', async (req, res) => {
  const token = req.body.token;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  let payload = ticket.getPayload();

  const user = await User.upsert({
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
  });
  // req.session.userId = user.id;
  res.status(201);
  res.json(user);
});

router.get('/me', async (req, res) => {
  res.status(200);
  res.json(req.user);
});

router.delete('/api/v1/auth/logout', async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.json({
    message: 'Logged out successfully',
  });
});

module.exports = router;
