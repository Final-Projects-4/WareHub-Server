const { Order, Customer, User, OrderProduct, sequelize, Revenue } = require('../models');

class OrderController {
  static async create(req, res, next) {
    const { name, customer_id, warehouse_id, user_id, product_id, price, quantity } = req.body;

    try {
      const order = await sequelize.transaction(async (t) => {
        const createdOrder = await Order.create(
          { name, customer_id, warehouse_id, user_id },
          { transaction: t }
        );

        const createdOrderDetail = await OrderProduct.create(
          {
            product_id,
            order_id: createdOrder.id,
            price: price,
            quantity: quantity,
            detail: `details of ${createdOrder.id}`,
          },
          { transaction: t }
        );

        await Revenue.create(
          {
            user_id,
            revenue: createdOrderDetail.price,
            detail: `revenue from order detail ${createdOrderDetail.id}`,
          },
          { transaction: t }
        );

        // if (warehouse_id) {
        //   await WarehouseStock.create(
        //     { product_id, warehouse_id, quantity },
        //     { transaction: t }
        //   );
        // }

        // if (vendor_id) {
        //   await ProductVendor.create(
        //     { product_id, vendor_id },
        //     { transaction: t }
        //   );
        // }

        return createdOrder;
      });

      res.status(201).json(order);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await Order.findAll({
        include: [Customer, User, OrderDetail],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const data = await Order.findOne({
        where: {
          id,
        },
        include: [Customer, User, OrderDetail],
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { user_id, customer_id, name } = req.body;
      const [updatedRowsCount, [updatedOrder]] = await Order.update(
        { user_id, customer_id, name },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw { name: 'ErrorNotFound' };
      }
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Order.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw new Error('Order not found');
      }
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = OrderController;
