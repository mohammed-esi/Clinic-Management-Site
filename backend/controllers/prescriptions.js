const { validationResult } = require('express-validator');
const User = require('../models/User');
const Prescription = require('../models/Prescription');

// @route GET /api/prescriptions/
// @desc  Get prescriptions
// @access  Private
const getPrescriptions = async (req, res, next) => {
  const prescriptions = await Prescription.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }],
  });

  res.json(prescriptions);
};

// @route POST /api/prescriptions/:prescMedicamentId
// @desc  Create prescription
// @access  Private
const createPrescription = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let prescription = await Prescription.create({
    date_presc: req.body.date_presc,
    user_id: req.user.id,
  });

  prescription = await Prescription.findOne({
    where: { id: prescription.id },
    include: [{ model: User }],
  });

  res.json(prescription);
};

// @route Put /api/prescriptions/:id
// @desc  Put a prescription
// @access Private
const updatePrescription = async (req, res, next) => {
  const { date_presc } = req.body;

  //Build medicament object
  const prescriptionFields = {};
  if (date_presc) prescriptionFields.date_presc = date_presc;

  let prescription = await Prescription.findOne({
    where: { id: req.params.id },
  });

  // Check Medicament Exist or not
  if (!prescription) {
    return res.json({ code_status: 400, msg: 'Precription not found!' });
  }

  prescription = await Prescription.update(prescriptionFields, {
    where: {
      id: req.params.id,
    },
  });

  res.json({ status_code: 200, message: 'Updated successfuly!' });
};

module.exports = {
  getPrescriptions,
  createPrescription,
  updatePrescription,
};
