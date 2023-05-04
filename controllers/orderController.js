const { Order, Customer, User, OrderProduct, Product, sequelize, Revenue, WarehouseStock, Warehouse } = require('../models');
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 1;

class OrderController {
  static async create(req, res, next) {
    const { name, customer_id, warehouse_id,order_products } = req.body;
  
    const t = await sequelize.transaction();
  
    try {
      const createdOrder = await Order.create(
        { name, customer_id, warehouse_id, user_id: req.user.id },
        { transaction: t }
      );
  
      let orderProductArray = [];
      let totalPrice = 0;
  
      for (let i = 0; i < order_products.length; i++) {
        const currentProduct = order_products[i];
  
        const product = await Product.findByPk(currentProduct.product_id, { transaction: t });
  
        if (!product || product.price !== currentProduct.price) {
          throw {name: "productPriceError"};
        }
  
        const warehouseStock = await WarehouseStock.findOne({
          where: {
            product_id: currentProduct.product_id,
            warehouse_id,
          },
          transaction: t,
        });
  
        if (!warehouseStock) {
          throw {name: "emptyStock"};
        }
  
        if (warehouseStock.quantity < currentProduct.quantity) {

          throw {name: "insufficient"};
        }
  
        const updatedQuantity = warehouseStock.quantity - currentProduct.quantity;
        await warehouseStock.update({ quantity: updatedQuantity }, { transaction: t });
  
        const createdOP = await OrderProduct.create(
          {
            product_id: currentProduct.product_id,
            order_id: createdOrder.id,
            price: currentProduct.price,
            quantity: currentProduct.quantity,
          },
          { transaction: t }
        );
  
        totalPrice += currentProduct.price * currentProduct.quantity;
        orderProductArray.push(createdOP);
      }
  
      await createdOrder.update({ total_price: totalPrice }, { transaction: t });
  
      await Revenue.create(
        {
          user_id: req.user.id,
          revenue: totalPrice,
          detail: `revenue from order detail ${createdOrder.id}`,
        },
        { transaction: t }
      );
  
      await t.commit();
  
      res.status(201).json({ ...(createdOrder.dataValues), order_products: orderProductArray });

    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  
  static async getAll(req, res, next) {
    try {
      const { page,limit } = req.query;
      const { count, rows: data } = await Order.findAndCountAll(filtering(req.query, req.user.id));
      const currentPage = page ? +page : DEFAULT_PAGE;
      const totalPages = limit ? Math.ceil(count / limit) : Math.ceil(count / DEFAULT_LIMIT);
      const result = {
        totalData: count,
        data,
        totalPages,
        currentPage
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const result = await Order.findOne({
        where: {
          id,
        },
        include: [Customer, User, Product],
      });

      if (result) {
        res.status(200).json(result);
      } else {
        throw { name: 'ErrorNotFound' };
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Order.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw {name: "ErrorNotFound"};
      }
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

function filtering(reqQuery, userId) {
  const { page, limit } = reqQuery;
  const offset = (page - 1) * limit;

  const filter = {
    where: {
      user_id: userId,
    },
    include: [Customer, Warehouse, User, OrderProduct],
    limit: parseInt(limit),
    offset: parseInt(offset),
  };

  return filter;
}




module.exports = OrderController;
