const express = require("express");
const CategoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/category", CategoryController.getAll);
router.post("/category", CategoryController.postAdd);
router.get("/category/id/:id", CategoryController.getById);
router.post("/category/id/:id", CategoryController.update);
router.delete("/category/id/:id", CategoryController.delete);
router.get("/category/name/:name", CategoryController.getByName);

module.exports = router;
