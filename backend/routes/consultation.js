const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getConsultations,
  createConsultation,
  updateConsultation,
  deleteConsulation,
  getConsultationById,
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
router
  .route('/:id')
  .get(authMiddleware, getConsultationById)
  .put(authMiddleware, updateConsultation)
  .delete(authMiddleware, deleteConsulation);

module.exports = router;
