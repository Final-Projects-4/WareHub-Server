'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Product,{foreignKey: 'product_id'})
      OrderDetail.belongsTo(models.Order,{foreignKey: 'order_id'})
    }
  }
  OrderDetail.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: true
        }
      }
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};