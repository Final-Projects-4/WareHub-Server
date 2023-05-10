const { sequelize, Product, Category, Warehouse, Vendor, Expense, ProductCategory,ProductVendor, WarehouseStock } = require('../models');
const { Op } = require('sequelize');
const ownedData = require('../middlewares/dataHandler')
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 1;

class ProductController {


  static async create(req, res, next) {
    const { name, price, weight, size, description, SKU, category_id } = req.body;
    
    

    try {
      const product = await sequelize.transaction(async (t) => {
        const createdProduct = await Product.create(
          { name, price, weight, size, description, SKU, user_id: req.user.id},
          { transaction: t }
        );

        
        await ProductCategory.create(
          { product_id: createdProduct.id, category_id },
          { transaction: t }
        );
        

        return createdProduct;
      });

      res.status(201).json(product);
    } catch (err) {
      console.log(err.name);
      next(err);
    }
  }


  static async addStock(req, res, next) {
    const { vendor_id, warehouse_id, quantity, product_id } = req.body;
  
    try {
      const Stock = await sequelize.transaction(async (t) => {
        const foundProduct = await Product.findOne({
          where: {
            id: product_id,
            user_id: req.user.id, 
          },
          transaction: t,
        });
  
        const foundWarehouse = await Warehouse.findOne({
          where: {
            id: warehouse_id,
            user_id: req.user.id, 
          },
          transaction: t,
        });

        const foundVendor = await Vendor.findOne({
          where: {
            id: vendor_id,
            user_id: req.user.id, 
          },
          transaction: t,
        });
  
        if (!foundProduct || !foundWarehouse || !foundVendor) {
          throw { name: "ErrorNotFound" };
        }
  
        const existingStock = await WarehouseStock.findOne({
          where: {
            product_id: foundProduct.id,
            warehouse_id: foundWarehouse.id
          },
          transaction: t
        });
        
        let updatedStock = {}

        if (existingStock) {
          existingStock.quantity += quantity;
          await existingStock.save({ transaction: t });
          updatedStock = existingStock
        } else {
          const newStock = await WarehouseStock.create(
            {
              product_id: foundProduct.id,
              warehouse_id: foundWarehouse.id,
              quantity: quantity,
            },
            { transaction: t }
          );

          updatedStock = newStock;
        }
  
        await Expense.create(
          {
            user_id: req.user.id,
            expense: foundProduct.price * quantity,
            detail: `Expense of ${foundProduct.user_id}`
          },
          { transaction: t }
        );
  
        await ProductVendor.create(
          {
            product_id: foundProduct.id,
            vendor_id: foundVendor.id,
          },
          { transaction: t }
        );
  
        return updatedStock
      });
  
      res.status(201).json(Stock);
    } catch (err) {
      next(err);
    }
  }
  

  static async getAll(req, res, next) {
    try {
      const {page, limit} = req.query;
      const { count, rows } = await Product.findAndCountAll(filtering(req.query, req.user));
      const currentPage = page ? +page : DEFAULT_PAGE;
      const totalPages = limit ? Math.ceil(count / limit) : Math.ceil(count / DEFAULT_LIMIT);
      const result = {
        totalItems: count,
        products: rows,
        totalPages,
        currentPage
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  

  static async getById(req, res, next) {
    try {
      const data = await ownedData(Product, req.params.id, req.user.id);
      res.status(200).json(data);
    } catch (err) { 
      next(err);
    }
  };


  static async update(req, res, next) {
    const { name, price, weight, size, description, SKU } = req.body;
    try {
      const data = await ownedData(Product, req.params.id, req.user.id);
      const [numOfRowsAffected, [updatedData]] = await Product.update(
        { 
          name: name, 
          price: price, 
          weight: weight, 
          size: size, 
          description: description, 
          SKU: SKU 
        },
        { where: 
          { id: data.id }
          , returning: true 
        }
      );
      res.status(200).json({ 
        previous: 
          { 
            name: data.name, 
            price: data.price, 
            weight: data.weight, 
            size: data.size, 
            description: data.description, 
            SKU: data.SKU  
          },
        current: updatedData,
        dataUpdated: numOfRowsAffected
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const product = await ownedData(Product, req.params.id, req.user.id);
      await Product.destroy({where: {id: req.params.id,}});
      res.status(200).json(
        {message: `${product.name} deleted`}
      );
      
    } catch (err) {
     next(err);
    }
  };
}

function filtering(query, user) {
  const { category_id, q, warehouse_id, vendor_id, limit, page, sort } = query;
  const offset = (page && limit) ? (page - 1) * limit : 0;
  
  const joinBuild = [
    { 
      model: Category, 
      where: category_id ? { id: +category_id } : {}, 
      required: true },
    { model: Warehouse, 
      where: warehouse_id ? { id: +warehouse_id } : {}, 
      required: true },
    { model: Vendor, 
      where: vendor_id ? { id: +vendor_id } : {}, 
      required: true }
  ];
  
  const result = {
    include: joinBuild,
    where: { user_id: user.id },
    limit: limit,
    offset: offset,
    distinct: true,
    order: sort ? [[sort.split(':')[0], sort.split(':')[1] || 'ASC']] : []
  };

  if (q) {
    result.where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { SKU: { [Op.iLike]: `%${q}%` } }
    ];
  }

  return result;
}


module.exports = ProductController;
