const express = require("express");
const router = express.Router();
const RevenueController = require("../controllers/revenueController.js");

router.get("/", RevenueController.findAll);
router.get("/:id", RevenueController.findOne);
router.post("/", RevenueController.create);
router.delete("/:id", RevenueController.delete);
router.put("/:id", RevenueController.update);

module.exports = router;
