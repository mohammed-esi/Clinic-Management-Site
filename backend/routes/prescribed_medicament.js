const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getPrescribedMedicaments,
  createPrescribedMedicament,
  deletePrecrebedMedicament,
} = require('../controllers/prescribed_medicaments');

router.post(
  '/:medicamentId/:prescriptionId',
  authMiddleware,
  [check('dosage', 'dosge is required!').notEmpty()],
  createPrescribedMedicament
);
router
  .route('/:id')
  .get(authMiddleware, getPrescribedMedicaments)
  .delete(authMiddleware, deletePrecrebedMedicament);

module.exports = router;
