const { sequelize, Product, Category, Warehouse, Vendor, Expense, ProductCategory,ProductVendor, WarehouseStock } = require('../models');
const { Op } = require('sequelize');
const ownedData = require('../middlewares/dataHandler')
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 1;
const { sendEmail } = require('../emailService')

class ProductController {


  static async create(req, res, next) {
    const { name, price, weight, size, description, SKU, category_id } = req.body;
    
    

    try {
      const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`
      const product = await sequelize.transaction(async (t) => {
        console.log(req.file.path)
        const createdProduct = await Product.create(
          { name, price, weight, size, description, SKU, user_id: req.user.id, image: imagePath},
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
      };
      //SEND EMAIL ALERT!
      rows.forEach((product) => {
        const warehouses = product.Warehouses;
        warehouses.forEach((warehouse) => {
          const stock = warehouse.WarehouseStock.quantity;
          if (stock < 10) {
            const recipientEmail = 'vincentkho67@gmail.com';
            const subject = 'Low Stock Alert';
            const html = `<p>Product ${product.id} in Warehouse ${warehouse.id} is running low on stock. Current stock: ${stock}</p>`;
            sendEmail(recipientEmail, subject, html);
          }
        });
      });


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
    const { file } = req;
    try {
      const data = await ownedData(Product, req.params.id, req.user.id);
      let updateFields = { 
        name, 
        price, 
        weight, 
        size, 
        description, 
        SKU 
      };
      if (file) {
        updateFields.image = file.path;
      }
      const [numOfRowsAffected, [updatedData]] = await Product.update(
        updateFields,
        { 
          where: { id: data.id },
          returning: true 
        }
      );
      res.status(200).json({ 
        previous: {
          name: data.name, 
          price: data.price, 
          weight: data.weight, 
          size: data.size, 
          description: data.description, 
          SKU: data.SKU,
          image: data.image
        },
        current: updatedData,
        dataUpdated: numOfRowsAffected
      });
    } catch (err) {
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
      required: category_id ? true : false },
    { 
      model: Warehouse, 
      where: warehouse_id ? { id: +warehouse_id } : {}, 
      required: warehouse_id ? true : false },
    { 
      model: Vendor, 
      where: vendor_id ? { id: +vendor_id } : {}, 
      required: vendor_id ? true : false }
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
