const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const { loginUser, getSelf } = require('../controllers/users');

router.post(
  '/login',
  [
    check('email', 'Email is required!').notEmpty().isEmail(),
    check('password', 'Password must be at least 6 characters!').isLength({
      min: 6,
    }),
  ],
  loginUser
);

router.get('/self', authMiddleware, getSelf);

module.exports = router;
