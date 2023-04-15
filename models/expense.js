'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User,{foreignKey: 'user_id'})
    }
  }
  Expense.init({
    user_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    expense: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    detail: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};