const { validationResult } = require('express-validator');
const Patient = require('../models/Patient');

// @route GET /api/patients
// @desc  Get patients
// @access  Null
getPatients = async (req, res, next) => {
  const patients = await Patient.findAll({
    order: [['createdAt', 'DESC']],
  });

  res.json(patients);
};

// @route POST /api/patients
// @desc  Create patient
// @access  Null
createPatient = async (req, res, next) => {
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
  });

  res.json(patient);
};

module.exports = {
  getPatients,
  createPatient,
};
