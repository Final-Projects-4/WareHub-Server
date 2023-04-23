const express = require('express');
const router = express.Router();
const ProductVendorController = require('../controllers/productVendorController');

// Create product-vendor relation
router.post('/', ProductVendorController.create);



// Update a specific product-vendor relation
router.put('/:id', ProductVendorController.update);

// Delete a specific product-vendor relation
router.delete('/:id', ProductVendorController.delete);

module.exports = router;
