const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Controllers
const { getPatients, createPatient } = require('../controllers/patients');

router
  .route('/')
  .post(
    [
      check('first_name', 'First Name is required!').notEmpty(),
      check('last_name', 'Last Name is required!').notEmpty(),
      check('age', 'Age is required!').notEmpty().isLength({ max: 3 }),
      check('sex', 'Sex is required!').notEmpty(),
      check('city', 'City is required!').notEmpty(),
      check('email', 'Email is required!').notEmpty().isEmail(),
      check(
        'blood_group',
        'Blood group is required and you should correct group of blood!'
      )
        .notEmpty()
        .isLength({ max: 3 }),
      check('phone_number', 'Title is required!').notEmpty().isNumeric(),
    ],
    createPatient
  )
  .get(getPatients);

module.exports = router;
