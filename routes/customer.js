const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

router.get("/customer", CustomerController.getAll);
router.post("/customer", CustomerController.postAdd);
router.get("/customer/id/:id", CustomerController.getById);
router.post("/customer/id/:id", CustomerController.update);
router.delete("/customer/id/:id", CustomerController.delete);
router.get("/customer/email/:email", CustomerController.getByEmail);

module.exports = router;
