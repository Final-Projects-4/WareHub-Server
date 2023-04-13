'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.belongsToMany(models.Product,{through: models.ProductVendor, foreignKey: 'vendor_id'})
    }
  }
  Vendor.init({
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    country: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};