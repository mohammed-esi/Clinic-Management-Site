const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getConsultations,
  createConsultation,
} = require('../controllers/consultations');

router.get('/', authMiddleware, getConsultations);
router.post(
  '/:appointmentId',
  authMiddleware,
  [
    check('motif', 'Motif is required and max 30 char!')
      .notEmpty()
      .isLength({ max: 30 }),
  ],
  [check('observation', 'Observation is required!').notEmpty()],
  createConsultation
);

module.exports = router;
