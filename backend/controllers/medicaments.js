const { validationResult } = require('express-validator');
const User = require('../models/User');
const Medicament = require('../models/Medicament');

// @route GET /api/medicaments
// @desc  Get medicaments
// @access  Private
const getMedicaments = async (req, res, next) => {
  const medicaments = await Medicament.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }],
  });

  res.json(medicaments);
};

// @route POST /api/medicaments
// @desc  Create Medicament
// @access  Private
const createMedicament = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  const medicamentExist = await Medicament.findOne({
    where: { name: name },
  });

  // Check if medicament exist or not
  if (medicamentExist)
    return res.json({
      status_code: 401,
      msg: 'This medicament already added!',
    });

  const medicament = await Medicament.create({
    name,
    user_id: req.user.id,
  });

  res.json(medicament);
};

// @route DELETE /api/medicaments/:id
// @desc  Delete a medicament
// @access Private
const deleteMedicament = async (req, res, next) => {
  try {
    const medicament = await Medicament.destroy({
      where: { id: req.params.id },
    });

    // Check Patient Exist or not
    if (medicament === 0) {
      return res.json({ code_status: 400, msg: 'Medicament not found!' });
    }
    res.json({ code_status: 200, msg: 'The medicament removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

// @route Put /api/medicaments/:id
// @desc  Put a medicament
// @access Private
const updateMedicament = async (req, res, next) => {
  const { name, dosage } = req.body;

  //Build medicament object
  const medicamentFields = {};
  if (name) medicamentFields.name = name;
  if (dosage) medicamentFields.dosage = dosage;

  let medicament = await Medicament.findOne({
    where: { id: req.params.id },
  });

  // Check Medicament Exist or not
  if (!medicament) {
    return res.json({ code_status: 400, msg: 'Medicament not found!' });
  }

  medicament = await Medicament.update(medicamentFields, {
    where: {
      id: req.params.id,
    },
  });

  res.json({ status_code: 200, message: 'Updated successfuly!' });
};

// @route GET /api/medicaments/:id
// @desc  Get medicament by ID
// @access  Private
const getMedicament = async (req, res, next) => {
  const medicament = await Medicament.findOne({
    where: { id: req.params.id },
    include: [{ model: User }],
  });

  if (!medicament) {
    return res.status(404).json({ msg: 'Medicament not found!' });
  }

  res.json(medicament);
};

module.exports = {
  getMedicaments,
  createMedicament,
  deleteMedicament,
  updateMedicament,
  getMedicament,
};
