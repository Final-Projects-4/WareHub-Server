'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouse.belongsToMany(models.Product, {through: models.WarehouseStock, foreignKey: 'warehouse_id'})
    }
  }
  Warehouse.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
    },
  }, {
    sequelize,
    modelName: 'Warehouse',
  });
  return Warehouse;
};