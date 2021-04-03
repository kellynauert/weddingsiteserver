const User = require('./user');
const Guest = require('./guest');
const Group = require('./group');

// Setup Associations
Guest.belongsTo(Group);
Group.hasMany(Guest);

module.exports = {
  User,
  Guest,
  Group,
};
