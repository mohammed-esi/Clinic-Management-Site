const { validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const User = require('../models/User');

// @route GET /api/patients
// @desc  Get patients
// @access  Null
const getPatients = async (req, res, next) => {
  const patients = await Patient.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }],
  });

  res.json(patients);
};

// @route POST /api/patients
// @desc  Create patient
// @access  Null
const createPatient = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    first_name,
    last_name,
    age,
    sex,
    city,
    email,
    phone_number,
    blood_group,
  } = req.body;

  const patient = await Patient.create({
    first_name,
    last_name,
    age,
    sex,
    city,
    email,
    phone_number,
    blood_group,
    user_id: req.user.id,
  });

  res.json(patient);
};

// @route GET /api/patients/:id
// @desc  Get patient by ID
// @access  Public
const getPatient = async (req, res, next) => {
  const patient = await Patient.findOne({
    where: { id: req.params.id },
    include: [{ model: User }],
  });

  if (!patient) {
    return res.status(404).json({ msg: 'Patient not found!' });
  }

  res.json(patient);
};

module.exports = {
  getPatients,
  createPatient,
  getPatient,
};
