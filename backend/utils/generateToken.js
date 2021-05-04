const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: '30d',
  });
};
