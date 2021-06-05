const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const {
  getMedicaments,
  createMedicament,
  deleteMedicament,
  updateMedicament,
  getMedicament,
} = require('../controllers/medicaments');

router
  .route('/')
  .post(
    authMiddleware,
    [check('name', 'Name is required!').notEmpty()],
    createMedicament
  )
  .get(authMiddleware, getMedicaments);

router
  .route('/:id')
  .delete(authMiddleware, deleteMedicament)
  .put(authMiddleware, updateMedicament)
  .get(authMiddleware, getMedicament);

module.exports = router;
