const express = require("express");
const ExpenseController = require("../controllers/expenseController.js");
const router = express.Router();

router.get("/", ExpenseController.findAll);
router.get("/:id", ExpenseController.findOne);
router.post("/", ExpenseController.create);
router.delete("/:id", ExpenseController.delete);
router.put("/:id", ExpenseController.update);

module.exports = router;
