const { validationResult } = require('express-validator');
const User = require('../models/User');
const Prescription = require('../models/Prescription');
const PrescribedMedicament = require('../models/PrescribedMedicament');

// @route GET /api/prescriptions/
// @desc  Get prescriptions
// @access  Private
const getPrescriptions = async (req, res, next) => {
  const prescriptions = await Prescription.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }, { model: PrescribedMedicament }],
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

  const presc_medicament = await PrescribedMedicament.findOne({
    where: { id: req.params.prescMedicamentId },
  });

  if (!presc_medicament) {
    return res
      .status(404)
      .json({ msg: 'prescrebted of this medicament not found!' });
  }

  let prescription = await Prescription.create({
    date_presc: req.body.date_presc,
    user_id: req.user.id,
    presc_medicament_id: req.params.prescMedicamentId,
  });

  prescription = await Prescription.findOne({
    where: { id: prescription.id },
    include: [{ model: User }, { model: PrescribedMedicament }],
  });

  res.json(prescription);
};

module.exports = {
  getPrescriptions,
  createPrescription,
};
