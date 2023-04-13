'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarehouseStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WarehouseStock.belongsTo(models.Product, { foreignKey: 'product_id' });
      WarehouseStock.belongsTo(models.Warehouse, { foreignKey: 'warehouse_id' });
    
    }
  }
  WarehouseStock.init({
    product_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    quantity: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'WarehouseStock',
  });
  return WarehouseStock;
};