const { validationResult } = require('express-validator');
// const User = require('../models/User');
const Medicament = require('../models/Medicament');
const Prescription = require('../models/Prescription');
const PrescribedMedicament = require('../models/PrescribedMedicament');

// @route GET /api/prescribed_medicaments/
// @desc  Get prescribed medicaments
// @access  Private
const getPrescribedMedicaments = async (req, res, next) => {
  const prescribed_medicaments = await PrescribedMedicament.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: Medicament }],
  });

  res.json(prescribed_medicaments);
};

// @route POST /api/prescribed_medicaments/:medicamentId/:prescriptionId
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

  const prescription = await Prescription.findOne({
    where: { id: req.params.prescriptionId },
  });

  if (!prescription) {
    return res.status(404).json({ msg: 'Prescription not found!' });
  }

  let prescribed_medicament = await PrescribedMedicament.create({
    dosage: req.body.dosage,
    user_id: req.user.id,
    medicament_id: req.params.medicamentId,
    prescription_id: req.params.prescriptionId,
  });

  prescribed_medicament = await PrescribedMedicament.findOne({
    where: { id: prescribed_medicament.id },
    include: [{ model: Medicament }],
  });

  res.json(prescribed_medicament);
};

// @route DELETE /api/prescribed_medicaments/:id
// @desc  Delete a precripbed medicament
// @access Private
const deletePrecrebedMedicament = async (req, res, next) => {
  try {
    const prescribed_medicament = await PrescribedMedicament.destroy({
      where: { id: req.params.id },
    });

    // Check Patient Exist or not
    if (prescribed_medicament === 0) {
      return res.json({
        code_status: 400,
        msg: 'Prescribed Medicament not found!',
      });
    }
    res.json({ code_status: 200, msg: 'The prescribed medicament removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

module.exports = {
  getPrescribedMedicaments,
  createPrescribedMedicament,
  deletePrecrebedMedicament,
};
