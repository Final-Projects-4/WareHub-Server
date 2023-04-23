const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const customerRouter = require("./customer");
const revenueRouter = require("./revenue");
const expenseRouter = require("./expense");
const usersRouter = require("./users")
const productRouter = require("./product")
const expenseRouter = require("./expense");
const orderRouter = require("./order");
const orderDetailRouter = require("./orderProduct");
const revenueRouter = require("./revenue");
const vendorRouter = require("./vendor");
const warehouseRouter = require("./warehouse");
const warehouseStockRouter = require("./warehousestock")
const productVendorRouter = require("./productVendor")

router.use('/users', usersRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/customers', customerRouter);
router.use('/expenses', expenseRouter);
router.use('/orders', orderRouter);
router.use('/order-details', orderDetailRouter);
router.use('/revenues', revenueRouter);
router.use('/vendors', vendorRouter);
router.use('/warehouses', warehouseRouter);
router.use('/warehousestocks', warehouseStockRouter);
router.use('/productVendors', productVendorRouter);

module.exports = router;
