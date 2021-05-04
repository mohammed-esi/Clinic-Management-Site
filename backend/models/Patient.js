const Sequelize = require('sequelize');
const User = require('./User');
const db = require('../config/db');

const Patient = db.define(
  'patients',
  {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sex: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    blood_group: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

module.exports = Patient;
