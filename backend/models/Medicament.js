const Sequelize = require('sequelize');
const User = require('./User');
const db = require('../config/db');

const Medicament = db.define(
  'medicaments',
  {
    name: {
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

module.exports = Medicament;
