const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointment,
} = require('../controllers/appointments');

router.get('/', authMiddleware, getAppointments);
router.post(
  '/:patientId',
  authMiddleware,
  [
    check('appointment_date', 'Date is required!').notEmpty(),
    check('appointment_hour', 'Hour is required!').notEmpty(),
  ],
  createAppointment
);
router
  .route('/:id')
  .get(authMiddleware, getAppointment)
  .delete(authMiddleware, deleteAppointment)
  .put(authMiddleware, updateAppointment);

module.exports = router;
