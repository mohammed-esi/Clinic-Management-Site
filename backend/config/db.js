var Sequelize = require('sequelize').Sequelize;
const config = require('./config');

const { database, username, password, host, dialect } = config;

module.exports = new Sequelize(
  database, // DB Name
  username, // Username
  password, // Password
  {
    host,
    dialect: dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);
