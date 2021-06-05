const { validationResult } = require('express-validator');
const User = require('../models/User');
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Consultation = require('../models/Consultation');

// @route GET /api/prescriptions/
// @desc  Get prescriptions
// @access  Private
const getConsultations = async (req, res, next) => {
  const consultations = await Consultation.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: User }, { model: Appointment }, { model: Prescription }],
  });

  res.json(consultations);
};

// @route POST /api/consultation/:appointmentId
// @desc  Create consultation
// @access  Private
const createConsultation = async (req, res, next) => {
  // Variables
  let prescriptionId = parseInt(req.query.prescriptionId);
  let prescription = null;
  let errors = validationResult(req);

  // Check Errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check Appointment exist or not
  const appointemnt = await Appointment.findOne({
    where: { id: req.params.appointmentId },
  });

  if (!appointemnt) {
    return res.status(404).json({ msg: 'This appointemnt does not exist!' });
  }

  // Check if there is prescription and if exist or not
  if (prescriptionId) {
    prescription = await Prescription.findOne({
      where: { id: req.query.prescriptionId },
    });
  }

  let consultation = await Consultation.create({
    motif: req.body.motif,
    observation: req.body.observation,
    user_id: req.user.id,
    app_id: req.params.appointmentId,
    presc_id: prescription ? prescription.id : null,
  });

  consultation = await Consultation.findOne({
    where: { id: consultation.id },
    include: [{ model: User }, { model: Appointment }, { model: Prescription }],
  });

  res.json(consultation);
};

module.exports = {
  getConsultations,
  createConsultation,
};
