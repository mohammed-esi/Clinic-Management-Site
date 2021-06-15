const { validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const User = require('../models/User');

// @route GET /api/patients
// @desc  Get patients
// @access  Private
const getAndFilterPatients = async (req, res, next) => {
  const patients = await Patient.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }],
  });

  res.json(patients);
};

// @route POST /api/patients
// @desc  Create patient
// @access  Private
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

  const patientExist = await Patient.findOne({
    where: { first_name: first_name, last_name: last_name },
  });

  // Check if patient exist or not
  if (patientExist)
    return res.json({ status_code: 401, msg: 'Patient already exist!' });

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

// @route DELETE /api/patients/:id
// @desc  Delete a patient
// @access Private
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.destroy({
      where: { id: req.params.id },
    });

    if (patient === 0) {
      return res.status(404).json({
        msg: 'This patient does not exist!',
      });
    }
    res.json({ code_status: 200, msg: 'The patient removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

// @route Put /api/patients/:id
// @desc  Put a patient
// @access Private
const updatePatient = async (req, res, next) => {
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

  //Build patient object
  const patientFields = {};
  if (first_name) patientFields.first_name = first_name;
  if (last_name) patientFields.last_name = last_name;
  if (age) patientFields.age = age;
  if (sex) patientFields.sex = sex;
  if (city) patientFields.city = city;
  if (email) patientFields.email = email;
  if (phone_number) patientFields.phone_number = phone_number;
  if (blood_group) patientFields.blood_group = blood_group;

  let patient = await Patient.findOne({
    where: { id: req.params.id },
  });

  // Check Patient Exist or not
  if (!patient) {
    return res.json({ code_status: 400, msg: 'Patient not found!' });
  }

  patient = await Patient.update(patientFields, {
    where: {
      id: req.params.id,
    },
  });

  patient = await Patient.findOne({
    where: { id: req.params.id },
  });

  res.json(patient);
};

// @route GET /api/patients/:id
// @desc  Get patient by ID
// @access  Private
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
  getAndFilterPatients,
  createPatient,
  getPatient,
  deletePatient,
  updatePatient,
};
