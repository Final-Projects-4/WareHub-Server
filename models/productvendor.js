'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVendor.belongsTo(Product, { foreignKey: 'product_id' });
      ProductVendor.belongsTo(Vendor, { foreignKey: 'vendor_id' });

    }
  }
  ProductVendor.init({
    product_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'ProductVendor',
  });
  return ProductVendor;
};