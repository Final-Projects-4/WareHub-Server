const express = require('express');
const router = express.Router();
const RevenueController = require('../controllers/revenueController');

router.post('/', RevenueController.create);
router.get('/', RevenueController.getAll);
router.get('/:id', RevenueController.getOne);
router.put('/:id', RevenueController.update);
router.delete('/:id', RevenueController.delete);

module.exports = router;
