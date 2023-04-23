const express = require('express');
const router = express.Router();
const OrderProductController = require('../controllers/orderProductController');

router.post('/', OrderProductController.create);
// router.get('/', OrderProductController.getAll);
// router.get('/:id', OrderProductController.getOne);
// router.put('/:id', OrderProductController.update);
// router.delete('/:id', OrderProductController.delete);

module.exports = router;