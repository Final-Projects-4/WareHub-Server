const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

router.get("/", CustomerController.getAll);
router.post("/", CustomerController.postAdd);
router.get("/:id", CustomerController.getById);
router.post("/:id", CustomerController.update);
router.delete("/:id", CustomerController.delete);
router.get("/:email", CustomerController.getByEmail);

module.exports = router;
