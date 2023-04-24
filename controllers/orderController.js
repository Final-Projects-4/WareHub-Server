const { Order, Customer, User, OrderProduct, Product, sequelize, Revenue } = require('../models');

class OrderController {
  static async create(req, res, next) {
    const { name, customer_id, warehouse_id, user_id, order_products} = req.body;

    try {
      // const order = await sequelize.transaction(async (t) => {
        const createdOrder = await Order.create(
          { name, customer_id, warehouse_id, user_id }
          // { transaction: t }
        );
      
      let orderProductArray = []
      let totalPrice = 0;
      for(let i = 0; i < order_products.length; i++) {
        const currentProduct = order_products[i]

        //validate product dulu
        let createdOP = await OrderProduct.create({
          product_id: currentProduct.product_id,
          order_id: createdOrder.id,
          price: currentProduct.price,
          quantity: currentProduct.quantity
        })

        totalPrice += currentProduct.price;

        orderProductArray.push(createdOP)
      }

      await createdOrder.update({total_price: totalPrice})
      await Revenue.create(
        {
          user_id,
          revenue: totalPrice,
          detail: `revenue from order detail ${createdOrder.id}`,
        }
          // ,{ transaction: t }
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

      res.status(201).json({...(createdOrder.dataValues), order_products: orderProductArray});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await Order.findAll({
        include: [Customer, User, OrderProduct],
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
        include: [Customer, User, Product],
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
