const { sequelize, Product, Category, Warehouse, Vendor, Expense, ProductVendor, WarehouseStock } = require('../models');
const { Op } = require('sequelize');

class ProductController {
  static async create(req, res, next) {
    const { name, price, weight, size, description, SKU, user_id } = req.body;
    const { vendor_id, warehouse_id} = req.query
    const quantity = req.body.quantity;
    

    try {
      const product = await sequelize.transaction(async (t) => {
        const createdProduct = await Product.create(
          { name, price, weight, size, description, SKU, user_id},
          { transaction: t }
        );

        await Expense.create(
          {
            user_id: user_id,
            expense: price,
            detail: `Expense of ${createdProduct.id}`,
          },
          { transaction: t }
        );
        
        if(warehouse_id) {
          await WarehouseStock.create(
            {product_id: createdProduct.id, warehouse_id, quantity},
            { transaction: t}
          );
        }

        if (vendor_id) {
          await ProductVendor.create(
            { product_id: createdProduct.id, vendor_id },
            { transaction: t }
          );
        }

        return createdProduct;
      });

      res.status(201).json(product);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }


  static async getAll(req, res, next) {
    try {
      const { count, rows } = await Product.findAndCountAll(filtering(req.query));
      res.status(200).json({ count, rows });
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

function filtering(query) {
  let {category_id,q,warehouse_id,vendor_id, limit, page, sort} = query;
  let offset = 0;

  if (page && limit) {
    offset = (page - 1) * limit;
  }
  

  let joinBuild = []

  let queryCategory = {
      model: Category,
      where: {}
  }

  let queryWarehouse = {
    model: Warehouse,
    where: {}
  }

  let queryVendor = {
    model: Vendor,
    where: {}
  }

  if(category_id) {
    queryCategory.where = {
      id: +category_id
    }
  } 

  if(warehouse_id) {
    queryWarehouse.where = {
      id: +warehouse_id
    }
  }

  if(vendor_id) {  
    queryVendor.where = {
      id: +vendor_id
    }
  }

  

  joinBuild.push(queryCategory)
  joinBuild.push(queryWarehouse)
  joinBuild.push(queryVendor)
  
  let result = {
    include: joinBuild,
    where: {},
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    limit: limit,
    offset: offset,
  };

  if(q) {
    result.where = {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${q}%`
          }
        },
        {
          SKU: {
            [Op.iLike]: `%${q}%`
          }
        }
      ]
    }
  }

  if (sort) {
    const sortArray = sort.split(':');
    result.order = [[sortArray[0], sortArray[1] || 'ASC']];
  }
  

  return result;

}

module.exports = ProductController;
