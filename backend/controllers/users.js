const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { DOCTOR, SECRETARY } = require('../utils/roles');
const { generateToken } = require('../utils/generateToken');

const { jwtSecret } = require('../config/config');
const User = require('../models/User');

// @route GET users/self
// @desc Gets logged in user info
// @access Private
const getSelf = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    return res.json(user);
  } catch (error) {
    return res.status(500).send({ msg: 'Server Error' });
  }
};

// @route POST users/login
// @desc Logins a user
// @access Public
const loginUser = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status_code: 400,
      msg: 'Confirm all fields are fill and password at least 6 characters!',
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.json({ status_code: 400, msg: 'Invalid Credentials' });
  }

  // Checking if the password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ status_code: 400, msg: 'Invalid Credentials' });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  res.json({
    status_code: 200,
    token: generateToken(payload),
  });
};

module.exports = {
  loginUser,
  getSelf,
};
