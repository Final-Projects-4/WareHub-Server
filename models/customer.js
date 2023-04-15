"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order,{foreignKey: 'customer_id'})
      Customer.belongsTo(models.User,{foreignKey: 'user_id'})
    }
  }
  Customer.init(
    {
      first_name: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        notEmpty: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
