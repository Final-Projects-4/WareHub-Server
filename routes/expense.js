const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expenseController');

router.post('/', ExpenseController.create);
router.get('/', ExpenseController.getAll);
router.get('/:id', ExpenseController.getOne);
router.put('/:id', ExpenseController.update);
router.delete('/:id', ExpenseController.delete);

module.exports = router;
