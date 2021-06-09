const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getPrescriptions,
  createPrescription,
  updatePrescription,
} = require('../controllers/prescriptions');

router.get('/', authMiddleware, getPrescriptions);
router.post(
  '/',
  authMiddleware,
  [check('date_presc', 'Date is required!').notEmpty().isDate()],
  createPrescription
);
router.route('/:id').put(authMiddleware, updatePrescription);

module.exports = router;
