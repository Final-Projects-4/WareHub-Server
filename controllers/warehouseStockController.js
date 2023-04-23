const { Product, Warehouse, WarehouseStock, sequelize } = require('../models');

class WarehouseStockController {
  static async moveProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { product_id, quantity, source_warehouse_id, destination_warehouse_id } = req.body;
      
      // check if the source warehouse and destination are valid
      const sourceWarehouse = await Warehouse.findByPk(source_warehouse_id, { transaction: t });
      const destinationWarehouse = await Warehouse.findByPk(destination_warehouse_id, { transaction: t });
      if (!sourceWarehouse || !destinationWarehouse) {
        throw new Error('Invalid warehouse ID');
      }

      // check products stock enough to be moved from the source warehouse
      const sourceStock = await WarehouseStock.findOne({ 
        where: { warehouse_id: source_warehouse_id, product_id: product_id },
        transaction: t
      });
      if (!sourceStock || sourceStock.quantity < quantity) {
        throw new Error('Insufficient quantity in source warehouse');
      }

      // update source & destination quantity
      await sourceStock.decrement('quantity', { by: quantity, transaction: t });
      let destinationStock = await WarehouseStock.findOne({ 
        where: { warehouse_id: destination_warehouse_id, product_id: product_id },
        transaction: t
      });
      if (!destinationStock) {
        destinationStock = await WarehouseStock.create({
          warehouse_id: destination_warehouse_id,
          product_id: product_id,
          quantity: quantity
        }, { transaction: t });
      } else {
        await destinationStock.increment('quantity', { by: quantity, transaction: t });
      }

      await t.commit();
      res.status(200).json({ message: 'Product moved successfully' });
    } catch (err) {
      await t.rollback();
      console.log(err);
      next(err);
    }
  }
  
  static async create(req, res, next) {
    const { product_id, warehouse_id, quantity } = req.body;

    try {
      const warehouseStock = await sequelize.transaction(async (t) => {
        const createdWarehouseStock = await WarehouseStock.create({
          product_id: product_id,
          warehouse_id: warehouse_id,
          quantity: quantity
        },
          { transaction: t }
        );

        return createdWarehouseStock;
      });

      res.status(201).json(warehouseStock);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  
}

module.exports = WarehouseStockController;
