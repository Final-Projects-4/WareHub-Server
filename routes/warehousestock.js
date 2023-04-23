const express = require('express');
const router = express.Router();
const WarehouseStockController = require('../controllers/warehouseStockController');

// router.post('/', WarehouseStockController.create);
// router.get('/', WarehouseStockController.getAll);
// router.get('/:id', WarehouseStockController.getOne);
// router.put('/:id', WarehouseStockController.update);
// router.delete('/:id', WarehouseStockController.delete);
router.post('/move', WarehouseStockController.moveProduct);

module.exports = router;
