const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getPrescriptions,
  createPrescription,
} = require('../controllers/prescriptions');

router.get('/', authMiddleware, getPrescriptions);
router.post(
  '/:prescMedicamentId',
  authMiddleware,
  [check('date_presc', 'Date is required!').notEmpty().isDate()],
  createPrescription
);

module.exports = router;
