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
      allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    revenue: {
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
    modelName: 'Revenue',
  });
  return Revenue;
};