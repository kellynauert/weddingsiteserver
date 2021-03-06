const { Router } = require('express');
const { Group, PlusOne, Guest } = require('../models/');
const validateSession = require('../middleware/validate-session');
const router = Router();

router.post('/', validateSession, function (req, res) {
  Group.create(req.body)
    .then((group) => {
      res.status(200).json(group);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/names', function (req, res) {
  Group.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })
    .then((groups) => {
      let dict = {};
      groups.forEach((item) => (dict[item.id] = item.groupName));
      res.status(200).json(dict);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/many', validateSession, function (req, res) {
  Group.bulkCreate(req.body)
    .then((group) => {
      res.status(200).json(group);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/:id', function (req, res) {
  const query = {
    where: { id: req.params.id },
  };
  Group.update(req.body, query)
    .then((group) => {
      res.status(200).json(group);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
router.delete('/:id', validateSession, function (req, res) {
  if (req.user.role === 'Admin') {
    Group.destroy({
      where: { id: req.params.id },
    })
      .then((guest) => res.status(200).json(guest))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(500).json({ error: 'Must be an admin to delete guests' });
  }
});
router.get('/:id', function (req, res) {
  const query = {
    where: { id: req.params.id },
    include: 'guests',
  };
  Group.findOne(query)
    .then((group) => res.status(200).json(group))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;

router.get('/', function (req, res) {
  const query = {
    include: { model: Guest, include: PlusOne },
    order: [['updatedAt', 'DESC']],
  };
  Group.findAll(query)
    .then((group) => res.status(200).json(group))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
