const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getPrescribedMedicaments,
  createPrescribedMedicament,
} = require('../controllers/prescribed_medicaments');

router.get('/', authMiddleware, getPrescribedMedicaments);
router.post(
  '/:medicamentId',
  authMiddleware,
  [check('dosage', 'dosge is required!').notEmpty()],
  createPrescribedMedicament
);

module.exports = router;
