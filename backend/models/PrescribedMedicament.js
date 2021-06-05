const Sequelize = require('sequelize');
const User = require('./User');
const Medicament = require('./Medicament');
const db = require('../config/db');

const PrescribedMedicament = db.define(
  'prescribed_medicaments',
  {
    dosage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    medicament_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Medicament,
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

module.exports = PrescribedMedicament;
