const User = require('./user');
const Guest = require('./guest');
const Group = require('./group');
const PlusOne = require('./plusone');
// Setup Associations
Guest.belongsTo(Group);
Group.hasMany(Guest);
PlusOne.belongsTo(Guest);
Guest.hasOne(PlusOne);

module.exports = {
  User,
  Guest,
  Group,
  PlusOne,
};
