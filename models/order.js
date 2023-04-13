'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail,{foreignKey: 'order_id'})
      Order.belongsTo(models.Customer,{foreignKey: 'customer_id'})
      Order.belongsTo(models.User,{foreignKey: 'user_id'})
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    customer_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};