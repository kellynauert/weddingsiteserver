const { Router } = require('express');
const { Guest, Group } = require('../models/');
const validateSession = require('../middleware/validate-session');
const router = Router();

router.post('/master/', validateSession, function (req, res) {
  const guestEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    groupId: req.body.groupId,
    attending: req.body.attending,
    over21: req.body.over21,
    drinking: req.body.drinking,
    plusOneId: req.body.plusOneId,
    plusOneAllowed: req.body.plusOneAllowed,
    diet: req.body.diet,
  };
  if (!req.body.groupId) {
    const groupName = req.body.groupName
      ? req.body.groupName
      : req.body.firstName + req.body.lastName;
    const groupEntry = {
      groupName,
    };

    Group.create(groupEntry).then((group) => {
      Guest.create({ ...guestEntry, groupId: group.id })
        .then((guest) => {
          res.status(200).json(guest);
        })
        .catch((err) => res.status(500).json({ error: err }));
    });
  } else {
    Guest.create(guestEntry)
      .then((guest) => {
        res.status(200).json(guest);
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
});

router.get('/master/', validateSession, function (req, res) {
  Guest.findAll()
    .then((guest) => res.status(200).json(guest))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/master/:id', validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id },
  };
  const guestEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    groupId: req.body.groupId,
    attending: req.body.attending,
    over21: req.body.over21,
    drinking: req.body.drinking,
    plusOneId: req.body.plusOneId,
    plusOneAllowed: req.body.plusOneAllowed,
    diet: req.body.diet,
  };

  Guest.update(guestEntry, query)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/master/:id', validateSession, function (req, res) {
  Guest.findOne({
    where: { id: req.params.id },
    include: 'group',
  })
    .then((guest) => res.status(200).json(guest))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/master/:id', validateSession, function (req, res) {
  if (req.user.role === "admin") {
    Guest.destroy({
      where: { id: req.params.id },
    })
      .then((guest) => res.status(200).json(guest))
      .catch((err) => res.status(500).json({ error: err }));
  } else { res.status(500).json({ error: "Must be an admin to delete guests" })
}
});

router.post('/', function (req, res) {
  const guestEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    groupId: req.body.groupId,
    attending: true,
    over21: req.body.over21,
    drinking: req.body.drinking,
    plusOneId: req.body.plusOneId,
    plusOneAllowed: false,
    diet: req.body.diet,
  };

  Guest.create(guestEntry)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/', function (req, res) {
  Guest.findAll()
    .then((guests) => {
      const guestsArr = [];
      guests.map((guest) => {
        const guestEntry = {
          id: guest.id,
          firstName: guest.firstName,
          lastName: guest.lastName,
          attending: guest.attending,
          over21: guest.over21,
          drinking: guest.drinking,
          plusOneId: guest.plusOneId,
          diet: guest.diet,
        };
        guestsArr.push(guestEntry);
      });
      return res.status(200).json(guestsArr);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/:id', function (req, res) {
  const query = {
    where: { id: req.params.id },
  };
  const guestEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    attending: req.body.attending,
    over21: req.body.over21,
    drinking: req.body.drinking,
    plusOneId: req.body.plusOneId,
    diet: req.body.diet,
  };

  Guest.update(guestEntry, query)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:id', function (req, res) {
  Guest.findOne({
    where: { id: req.params.id },
    include: 'group',
  })
    .then((guest) => {
      const guestEntry = {
        firstName: guest.firstName,
        lastName: guest.lastName,
        attending: guest.attending,
        over21: guest.over21,
        drinking: guest.drinking,
        plusOneId: guest.plusOneId,
        diet: guest.diet,
      };
      return res.status(200).json(guestEntry);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/:id', function (req, res) {
  Guest.findOne({
    where: { id: req.params.id },
  })
    .then((guest) => {
      if (guest.plusOneId)
        Guest.destroy({
          where: { id: guest.id },
        })
          .then((guest) => res.status(200).json(guest))
          .catch((err) => res.status(500).json({ error: err }));
      else
        res
          .status(500)
          .json({ error: 'Must be logged in to delete a non-plus one' });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
