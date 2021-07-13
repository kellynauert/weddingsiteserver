const User = require('./user');
const Student = require('./student');
const School = require('./school');

Student.belongsTo(School, { through: 'schoolId' });
// School.belongsToMany(Student, { through: 'stateId' });

module.exports = {
  User,
  Student,
  School,
};
