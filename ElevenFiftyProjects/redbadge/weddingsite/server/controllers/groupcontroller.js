const { Router } = require('express');
const { Group } = require('../models/');
const validateSession = require('../middleware/validate-session');
const router = Router();

router.post('/', validateSession, function (req, res) {
  const groupEntry = {
    groupName: req.body.groupName,
    address: req.body.address,
    phone: req.body.phone,
  };

  Group.create(groupEntry)
    .then((group) => {
      res.status(200).json(group);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
router.put('/:id', function (req, res) {
  const groupEntry = {
    id: req.params.id,
    groupName: req.body.groupName,
    address: req.body.address,
    phone: req.body.phone,
  };

  Group.update(groupEntry)
    .then((group) => {
      res.status(200).json(group);
    })
    .catch((err) => res.status(500).json({ error: err }));
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
    include: 'guests',
  };
  Group.findAll(query)
    .then((group) => res.status(200).json(group))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
