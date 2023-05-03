const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');


router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.post('/create', ProductController.create);
router.post('/stocks', ProductController.addStock);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
