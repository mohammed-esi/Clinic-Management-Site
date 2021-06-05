const Sequelize = require('sequelize');
const User = require('./User');
const Appointment = require('./Appointment');
const Prescription = require('./Prescription');
const db = require('../config/db');

const Consultation = db.define(
  'consultations',
  {
    motif: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    observation: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    app_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Appointment,
        key: 'id',
      },
      allowNull: false,
    },
    presc_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Prescription,
        key: 'id',
      },
      allowNull: true,
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

module.exports = Consultation;
