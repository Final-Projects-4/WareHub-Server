'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Revenue,{foreignKey: 'user_id'})
      User.hasMany(models.Expense,{foreignKey: 'user_id'})
      User.hasMany(models.Product,{foreignKey: 'user_id'})
      User.hasMany(models.Order,{foreignKey: 'user_id'})
      User.hasMany(models.Customer,{foreignKey: 'user_id'})
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    last_name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    address: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    },
    company: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};