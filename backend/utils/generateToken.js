const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '30d',
  });
};
