const { Warehouse } = require('../models');


class WarehouseController {
  static async create(req, res, next) {
    try {
      const { name, city, address } = req.body;
      const warehouse = await Warehouse.create({ name, city, address });
      res.status(201).json(warehouse);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAll(req, res, next) {
    console.log('get all warehouses')
    try {
      const data = await Warehouse.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const data = await Warehouse.findOne({
        where: {
          id,
        },
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
      const { name, city, address } = req.body;
      const [updatedRowsCount, [updatedWarehouse]] = await Warehouse.update(
        { name, city, address },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw new Error('Warehouse not found');
      }
      res.status(200).json(updatedWarehouse);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Warehouse.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw new Error('Warehouse not found');
      }
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = WarehouseController;
