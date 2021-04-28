const { Router } = require('express');
const { PlusOne, Guest } = require('../models/');
const router = Router();

router.post('/', function (req, res) {
  const guestEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    attending: true,
    drinking: req.body.drinking,
    diet: req.body.diet,
    guestId: req.body.guestId,
  };
  PlusOne.create(guestEntry)
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
  const query = {
    where: { id: req.params.id },
  };
  const guestEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    drinking: req.body.drinking,
    diet: req.body.diet,
  };

  PlusOne.update(guestEntry, query)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
