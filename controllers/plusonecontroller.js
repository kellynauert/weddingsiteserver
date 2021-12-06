const { Router } = require('express');
const { PlusOne, Guest } = require('../models/');
const router = Router();

router.post('/', function (req, res) {
  PlusOne.create(req.body)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
router.get('/:id', function (req, res) {
  PlusOne.findOne({ where: { id: req.params.id } })
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
router.get('/', function (req, res) {
  query = {
    include: Guest,
  };
  PlusOne.findAll(query)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/:id', function (req, res) {
  PlusOne.destroy({
    where: { id: req.params.id },
  })
    .then((guest) => res.status(200).json(guest))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/:id', function (req, res) {
  PlusOne.update(req.body.guest, {
    where: { id: req.params.id },
  })
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
