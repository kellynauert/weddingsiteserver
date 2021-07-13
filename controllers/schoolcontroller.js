const { Router } = require('express');
const { School } = require('../models');

const router = Router();

router.post('/', (req, res) => {
  let query = {
    school: req.body.school,
    schoolGroup: req.body.schoolGroup,
    schoolAbbreviation: req.body.schoolAbbreviation,
    accessCode: req.body.accessCode,
    active: req.body.active,
  };

  School.upsert(query)
    .then((school) => res.status(200).json(school))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:code', (req, res) => {
  School.findOne({ where: { accessCode: req.params.code } })
    .then((school) => {
      if (school) {
        res.status(200).json(school);
      } else {
        res.status(404).json(school);
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
