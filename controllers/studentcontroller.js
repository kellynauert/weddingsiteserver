const { Router } = require('express');
const validateSession = require('../middleware/validate-session');
const { Student, School } = require('../models');

const router = Router();

router.get('/:id', (req, res) => {
  Student.findOne({ where: { stateID: req.params.id }, include: 'school' })
    .then((student) => res.status(200).json(student))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/', (req, res) => {
  let students = [
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      stateId: req.body.stateId,
      grade: req.body.grade,
      gender: req.body.gender,
      ethnicity: req.body.ethnicity,
      lunch: req.body.lunch,
      sped: req.body.sped,
      ell: req.body.ell,
      section: req.body.class,
      studentEmail: req.body.studentEmail,
      guardian1Name: req.body.guardian1Name,
      guardian1Email: req.body.guardian1Email,
      guardian2Name: req.body.guardian2Name,
      guardian2Email: req.body.guardian2Email,
      mathspaceId: req.body.mathspaceId,
      schoolId: req.body.schoolId,
    },
  ];
  Student.bulkCreate(req.body.students, {
    fields: [
      'stateId',
      'firstName',
      'lastName',
      'grade',
      'gender',
      'ethnicity',
      'lunch',
      'sped',
      'ell',
      'section',
      'studentEmail',
      'guardian1Name',
      'guardian2name',
      'guardian1email',
      'mathspaceId',
      'guardian2email',
      'schoolId',
      'updatedAt',
    ],
    updateOnDuplicate: [
      'firstName',
      'lastName',
      'grade',
      'gender',
      'ethnicity',
      'lunch',
      'sped',
      'ell',
      'section',
      'studentEmail',
      'guardian1Name',
      'guardian2name',
      'guardian1email',
      'mathspaceId',
      'guardian2email',
      'schoolId',
      'updatedAt',
    ],
  })
    .then((student) => res.status(200).json(student))
    .then((result) => console.log(result))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
