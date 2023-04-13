'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Vendor,{through: models.ProductVendor, foreignKey: 'product_id'})
      Product.belongsToMany(models.Category,{through: models.ProductCategory, foreignKey: 'product_id'})
      Product.belongsToMany(models.Warehouse,{through: models.WarehouseStock, foreignKey: 'product_id'})
      Product.belongsTo(models.User, {foreignKey: 'user_id'})
      Product.hasMany(models.Order,{foreignKey: 'product.id'})
      Product.hasMany(models.OrderDetail,{foreignKey: 'product.id'})


    }
  }
  Product.init({
    user_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    price: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    weight: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    size: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    description: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    SKU: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};