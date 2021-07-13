const { DataTypes } = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  mathspaceId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  studentEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ethnicity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lunch: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sped: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ell: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  guardian1Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  guardian1Email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  guardian2Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  guardian2Email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Student;
