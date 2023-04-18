const { Product } = require('../models');
const errorHandler = require('../middlewares/errorHandler');

class ProductController {
  static async create(req, res, next) {
    try {
      const { name, price, weight, size, description, SKU } = req.body;
      const product = await Product.create({ name, price, weight, size, description, SKU });
      res.status(201).json(product);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAll(req, res, next) {
    console.log('get all products')
    try {
      const data = await Product.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const data = await Product.findOne({
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
      const { name, price, weight, size, description, SKU } = req.body;
      const [updatedRowsCount, [updatedProduct]] = await Product.update(
        { name, price, weight, size, description, SKU },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount !== 1) {
        throw new Error('Product not found');
      }
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Product.destroy({ where: { id } });
      if (deletedRowsCount !== 1) {
        throw new Error('Product not found');
      }
      res.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ProductController;
