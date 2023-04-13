'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Revenue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Revenue.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  }
  Revenue.init({
    user_id: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false 
    },
    revenue: {
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
    modelName: 'Revenue',
  });
  return Revenue;
};