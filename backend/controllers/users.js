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
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }

  // Checking if the password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  res.json({
    _id: user._id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    token: generateToken(payload),
  });
};

module.exports = {
  loginUser,
  getSelf,
};
