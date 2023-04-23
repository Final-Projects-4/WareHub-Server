const { OrderProduct, Product, Order } = require('../models');


class OrderProductController {
  static async create(req, res, next) {
    try {
      const { product_id, order_id, price, quantity } = req.body;
      const orderProduct = await OrderProduct.create({ product_id, order_id, price, quantity });
      res.status(201).json(orderProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

}

module.exports = OrderProductController;
