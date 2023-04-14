const express = require("express");
const router = express.Router();
const routerCategory = require("./routerCategory");

router.use(routerCategory);

module.exports = router;
