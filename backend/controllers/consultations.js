const { validationResult } = require('express-validator');
const User = require('../models/User');
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Consultation = require('../models/Consultation');
const Patient = require('../models/Patient');
const PrescribedMedicament = require('../models/PrescribedMedicament');

// @route GET /api/prescriptions/
// @desc  Get prescriptions
// @access  Private
const getConsultations = async (req, res, next) => {
  const consultations = await Consultation.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      { model: User },
      { model: Appointment, include: [{ model: Patient }] },
      { model: Prescription },
    ],
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

// @route Put /api/consultations/:id
// @desc  Put a consultation
// @access Private
const updateConsultation = async (req, res, next) => {
  const { motif, observation } = req.body;

  //Build medicament object
  const consultaionFields = {};
  if (motif) consultaionFields.motif = motif;
  if (observation) consultaionFields.observation = observation;

  let consultaion = await Consultation.findOne({
    where: { id: req.params.id },
  });

  // Check Medicament Exist or not
  if (!consultaion) {
    return res.json({ code_status: 400, msg: 'Consultation not found!' });
  }

  consultaion = await Consultation.update(consultaionFields, {
    where: {
      id: req.params.id,
    },
  });

  res.json({ status_code: 200, message: 'Updated successfuly!' });
};

// @route DELETE /api/consultation/:id
// @desc  Delete a consultation
// @access Private
const deleteConsulation = async (req, res, next) => {
  // Variables
  let prescribed_medicaments = null;
  try {
    const consultation = await Consultation.findOne({
      where: { id: req.params.id },
    });

    // Check consultation Exist or not
    if (!consultation) {
      return res.json({ code_status: 400, msg: 'Consultation not found!' });
    }

    // Check if there is a prescription exist in this consultation
    if (consultation.presc_id) {
      // Destroy consultation
      await Consultation.destroy({ where: { id: req.params.id } });

      // Check if there prescribed for this prescription
      prescribed_medicaments = await PrescribedMedicament.findAll({
        where: {
          prescription_id: consultation.presc_id,
        },
      });

      // Destroy all prescribed exist
      if (prescribed_medicaments) {
        await PrescribedMedicament.destroy({
          where: {
            prescription_id: consultation.presc_id,
          },
        });
      }

      // Destroy prescription exists
      await Prescription.destroy({
        where: {
          id: consultation.presc_id,
        },
      });
    } else {
      // Destroy consultation
      await Consultation.destroy({ where: { id: req.params.id } });
    }

    res.json({ code_status: 200, msg: 'The consultation removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

// @route GET /api/consultations/:id
// @desc  Get consultation by ID
// @access  Private
const getConsultationById = async (req, res, next) => {
  const consultation = await Consultation.findOne({
    where: { id: req.params.id },
    include: [
      { model: Appointment, include: [{ model: Patient }] },
      { model: Prescription },
    ],
  });

  if (!consultation) {
    return res.status(404).json({ msg: 'Consultations not found!' });
  }

  res.json(consultation);
};

module.exports = {
  getConsultations,
  createConsultation,
  updateConsultation,
  deleteConsulation,
  getConsultationById,
};
