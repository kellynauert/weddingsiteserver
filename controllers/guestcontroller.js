const { Router } = require('express');
const { Guest, Group, PlusOne } = require('../models/');
const validateSession = require('../middleware/validate-session');
const router = Router();
const { Op } = require('sequelize');

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
    vegetarian: req.body.vegetarian,
  };
  if (req.user.role === 'Admin') {
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
  } else {
    res.status(500).json({ error: 'Must be an admin to delete guests' });
  }
});
router.post('/master/many/', validateSession, function (req, res) {
  Guest.bulkCreate(req.body)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get('/master/', validateSession, function (req, res) {
  Guest.findAll({
    include: ['group', 'plusone'],
    order: [['updatedAt', 'DESC']],
  })
    .then((guest) => res.status(200).json(guest))
    .catch((err) => res.status(500).json({ error: err }));
});
router.get('/master/count', function (req, res) {
  query = {
    attending: 0,
    notAttending: 0,
    invited: 0,
    plusOneAllowed: 0,
    plusOnes: 0,
    plusOnesDrinking: 0,
    drinking: 0,
    vegetarian: 0,
    plusOnesVegetarian: 0,
    mead: 0,
    wine: 0,
    beer: 0,
    cider: 0,
    pomead: 0,
    powine: 0,
    pobeer: 0,
    pocider: 0,
    children: 0,
    childrenAttending: 0,
  };
  Promise.all([
    Guest.count({
      col: 'attending',
      where: { attending: false },
    }).then((noResponse) => (query.notAttending = noResponse)),

    Guest.count({
      col: 'attending',
      where: { attending: true },
    }).then((attendees) => (query.attending = attendees)),

    Guest.count({
      col: 'firstName',
    }).then((names) => (query.invited = names)),

    PlusOne.count({
      col: 'id',
    }).then((names) => (query.plusOnes = names)),

    Guest.count({
      col: 'drinking',
      where: { drinking: 'true', attending: true },
    }).then((drinkers) => (query.drinking = drinkers)),

    PlusOne.count({
      col: 'drinking',
      where: { drinking: 'true' },
    }).then((drinkers) => (query.plusOnesDrinking = drinkers)),

    Guest.count({
      where: {
        vegetarian: true,
        attending: true,
      },
    }).then((vegetarians) => (query.vegetarian = vegetarians)),

    PlusOne.count({
      where: {
        vegetarian: true,
      },
    }).then((vegetarians) => (query.plusOnesVegetarian = vegetarians)),

    Guest.count({
      where: {
        plusOneAllowed: true,
      },
    }).then((allowed) => (query.plusOneAllowed = allowed)),

    Guest.count({
      where: {
        mead: true,
        attending: true,
      },
    }).then((mead) => (query.mead = mead)),

    Guest.count({
      where: {
        beer: true,
        attending: true,
      },
    }).then((beer) => (query.beer = beer)),

    Guest.count({
      where: {
        wine: true,
        attending: true,
      },
    }).then((wine) => (query.wine = wine)),

    Guest.count({
      where: {
        cider: true,
        attending: true,
      },
    }).then((cider) => (query.cider = cider)),

    PlusOne.count({
      where: {
        mead: true,
      },
    }).then((mead) => (query.pomead = mead)),

    PlusOne.count({
      where: {
        beer: true,
      },
    }).then((beer) => (query.pobeer = beer)),

    PlusOne.count({
      where: {
        wine: true,
      },
    }).then((wine) => (query.powine = wine)),

    PlusOne.count({
      where: {
        cider: true,
      },
    }).then((cider) => (query.pocider = cider)),

    Group.findAll().then((groups) => {
      let possible = 0;
      let attending = 0;
      for (let group of groups) {
        possible = possible + group.children;
        attending = attending + group.childrenAttending;
      }
      query.children = possible;
      query.childrenAttending = attending;
    }),
  ]).then(() => res.status(200).json(query));
});

router.put('/master/:id', validateSession, function (req, res) {
  Guest.update(req.body.guest, {
    where: { id: req.params.id },
    returning: true,
  })
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/master/:id', validateSession, function (req, res) {
  Guest.findOne({
    where: { id: req.params.id },
    include: ['group', PlusOne],
  })
    .then((guest) => res.status(200).json(guest))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/master/:id', validateSession, function (req, res) {
  if (req.user.role === 'Admin') {
    Guest.destroy({
      where: { id: req.params.id },
    })
      .then((guest) => res.status(200).json(guest))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(500).json({ error: 'Must be an admin to delete guests' });
  }
});

router.put('/:id', function (req, res) {
  Guest.update(req.body.guest, {
    where: { id: req.params.id },
    returning: true,
  })
    .then((guest) => res.status(200).json(guest))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get('/:id', function (req, res) {
  Guest.findOne({
    where: { id: req.params.id },
    include: ['group', PlusOne],
  })
    .then((guestEntry) => {
      return res.status(200).json(guestEntry);
    })
    .catch((err) => res.status(500).json({ error: err }));
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
module.exports = router;
