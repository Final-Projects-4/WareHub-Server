const express = require("express");
const router = express.Router();
const routerCategory = require("./routerCategory");
const routerCustomer = require("./routerCustomer");

router.use(routerCategory);
router.use(routerCustomer);

module.exports = router;
