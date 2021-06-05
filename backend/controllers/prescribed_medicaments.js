const { validationResult } = require('express-validator');
const User = require('../models/User');
const Medicament = require('../models/Medicament');
const PrescribedMedicament = require('../models/PrescribedMedicament');

// @route GET /api/prescribed_medicaments/
// @desc  Get prescribed medicaments
// @access  Private
const getPrescribedMedicaments = async (req, res, next) => {
  const prescribed_medicaments = await PrescribedMedicament.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }, { model: Medicament }],
  });

  res.json(prescribed_medicaments);
};

// @route POST /api/prescribed_medicaments/:medicamentId
// @desc  Create prescribed medicament
// @access  Private
const createPrescribedMedicament = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const medicament = await Medicament.findOne({
    where: { id: req.params.medicamentId },
  });

  if (!medicament) {
    return res.status(404).json({ msg: 'Medicament not found!' });
  }

  let prescribed_medicament = await PrescribedMedicament.create({
    dosage: req.body.dosage,
    user_id: req.user.id,
    medicament_id: req.params.medicamentId,
  });

  prescribed_medicament = await PrescribedMedicament.findOne({
    where: { id: prescribed_medicament.id },
    include: [{ model: User }, { model: Medicament }],
  });

  res.json(prescribed_medicament);
};

module.exports = {
  getPrescribedMedicaments,
  createPrescribedMedicament,
};
