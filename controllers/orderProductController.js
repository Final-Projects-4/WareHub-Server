const { OrderProduct } = require('../models');

class OrderProductController {
  static async create(req, res, next) {
    try {
      const { product_id, order_id, price, quantity } = req.body;
      const orderProduct = await OrderProduct.create({ product_id, order_id, price, quantity });
      res.status(201).json(orderProduct);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await OrderProduct.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const data = await OrderProduct.findOne({
        where: {
          id,
        },
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { message: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { product_id, order_id, price, quantity } = req.body;
      const [updatedRowsCount, [updatedOrderProduct]] = await OrderProduct.update(
        { product_id, order_id, price, quantity },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw { message: "ErrorNotFound" };
      }
      res.status(200).json(updatedOrderProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await OrderProduct.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw { message: "ErrorNotFound" };
      }
      res.status(204).json({ message: 'Deleted successfully' });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = OrderProductController;
