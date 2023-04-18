const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const customerRouter = require("./customer");
const usersRouter = require("./users")
const productRouter = require("./product")

router.use('/users', usersRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/customers', customerRouter);

module.exports = router;
