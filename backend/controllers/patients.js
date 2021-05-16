const { validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const User = require('../models/User');
const Op = require('sequelize').Op;

// @route GET /api/patients
// @desc  Get patients
// @access  Private
const getAndFilterPatients = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.size) || 5;
  let filterPatients = req.query.filterPatients || 'false';
  let age = parseInt(req.query.age);
  let first_name = req.query.first_name;
  let last_name = req.query.last_name;
  let city = req.query.city;

  const offset = page === 1 ? 0 : (page - 1) * limit;

  console.log('offset = ' + offset);

  let patients = {};

  // Get filter
  if (filterPatients === 'true') {
    // Filter by Age
    if (age) {
      patients = await Patient.findAndCountAll({
        where: {
          [Op.or]: [
            {
              age: { [Op.like]: `%${age}%` },
            },
          ],
        },
        include: [{ model: User }],
        limit: limit,
        offset: offset,
      });
    }
    // Filter by First Name
    if (first_name) {
      patients = await Patient.findAndCountAll({
        where: {
          [Op.or]: [
            {
              first_name: { [Op.like]: `%${first_name}%` },
            },
          ],
        },
        include: [{ model: User }],
        limit: limit,
        offset: offset,
      });
    }
    // Filter by Last Name
    if (last_name) {
      patients = await Patient.findAndCountAll({
        where: {
          [Op.or]: [
            {
              last_name: { [Op.like]: `%${last_name}%` },
            },
          ],
        },
        include: [{ model: User }],
        limit: limit,
        offset: offset,
      });
    }
    if (city) {
      // Filter by City
      patients = await Patient.findAndCountAll({
        where: {
          [Op.or]: [
            {
              city: { [Op.like]: `%${city}%` },
            },
          ],
        },
        include: [{ model: User }],
        limit: limit,
        offset: offset,
      });
    }
  } else {
    // Without filtering
    patients = await Patient.findAndCountAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: User }],
      limit: limit,
      offset: offset,
    });
  }

  res.json({
    patients,
    page,
    pages: Math.ceil(patients.count / limit),
  });
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

    // Check Patient Exist or not
    if (patient === 0) {
      return res.json({ code_status: 400, msg: 'Patient not found!' });
    }
    res.json({ code_status: 200, msg: 'The service removed!' });
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

  res.json({ status_code: 200, message: 'Updated successfuly!' });
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
