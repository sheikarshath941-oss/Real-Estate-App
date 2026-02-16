const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post('/', authMiddleware, createProperty);
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);

module.exports = router;
