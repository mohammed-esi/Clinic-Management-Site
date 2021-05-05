const Sequelize = require('sequelize');
const User = require('./User');
const Patient = require('./Patient');
const db = require('../config/db');

const Appointment = db.define(
  'appointments',
  {
    appointment_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    appointment_hour: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    patient_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Patient,
        key: 'id',
      },
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

module.exports = Appointment;
