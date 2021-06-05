const { validationResult } = require('express-validator');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Op = require('sequelize').Op;

// @route GET /api/appointments
// @desc  Get appointments
// @access  Private
const getAndFilterAppointments = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.size) || 5;
  let filterAppointments = req.query.filterAppointments || 'false';
  let first_name = req.query.first_name;
  let last_name = req.query.last_name;

  const offset = page === 1 ? 0 : (page - 1) * limit;

  console.log('offset = ' + offset);

  let appointments = {};

  // Get filter
  if (filterAppointments === 'true') {
    // Filter by First Name
    if (first_name) {
      appointments = await Appointment.findAndCountAll({
        include: [
          { model: User },
          {
            model: Patient,
            where: {
              [Op.or]: [
                {
                  first_name: { [Op.like]: `%${first_name}%` },
                },
              ],
            },
            require: true,
            right: true,
          },
        ],
        limit: limit,
        offset: offset,
      });
    }
    // Filter by Last Name
    if (last_name) {
      appointments = await Appointment.findAndCountAll({
        include: [
          { model: User },
          {
            model: Patient,
            where: {
              [Op.or]: [
                {
                  last_name: { [Op.like]: `%${last_name}%` },
                },
              ],
            },
            require: true,
            right: true,
          },
        ],
        limit: limit,
        offset: offset,
      });
    }
  } else {
    // Without filtering
    appointments = await Appointment.findAndCountAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: User }, { model: Patient }],
      limit: limit,
      offset: offset,
    });
  }

  res.json({
    appointments,
    page,
    pages: Math.ceil(appointments.count / limit),
  });
};

// @route POST /api/appointments/:patientId
// @desc  Create appointment
// @access  Private
const createAppointment = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const patient = await Patient.findOne({
    where: { id: req.params.patientId },
  });

  if (!patient) {
    return res.status(404).json({ msg: 'Patient not found!' });
  }

  let appointment = await Appointment.create({
    appointment_date: req.body.appointment_date,
    appointment_hour: req.body.appointment_hour,
    user_id: req.user.id,
    patient_id: req.params.patientId,
  });

  appointment = await Appointment.findOne({
    where: { id: appointment.id },
    include: [{ model: User }, { model: Patient }],
  });

  res.json(appointment);
};

// @route DELETE /api/appointments/:id
// @desc  Delete a appointment
// @access Private
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.destroy({
      where: { id: req.params.id },
    });

    // Check Appointment Exist or not
    if (appointment === 0) {
      return res.json({ code_status: 400, msg: 'Appointment not found!' });
    }
    res.json({ code_status: 200, msg: 'The appointment removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

// @route Put /api/appointments/:id
// @desc  Update a appointments
// @access Private
const updateAppointment = async (req, res, next) => {
  const { appointment_date, appointment_hour } = req.body;

  //Build patient object
  const appointmentFields = {};
  if (appointment_date) appointmentFields.appointment_date = appointment_date;
  if (appointment_hour) appointmentFields.appointment_hour = appointment_hour;

  let appointment = await Appointment.findOne({
    where: { id: req.params.id },
  });

  // Check Patient Exist or not
  if (!appointment) {
    return res.json({ code_status: 400, msg: 'Appointment not found!' });
  }

  appointment = await Appointment.update(appointmentFields, {
    where: {
      id: req.params.id,
    },
  });

  res.json({ status_code: 200, message: 'Updated successfuly!' });
};

module.exports = {
  getAndFilterAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
};
