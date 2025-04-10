'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {foreignKey: 'UserId'})
      Product.belongsToMany(models.Category, {
        through: 'ProductCategories',
        foreignKey: 'ProductId',
        otherKey: 'CategoryId'
      })
      Product.hasMany(models.TransactionDetail, {foreignKey: 'ProductId'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name required!'
        },
        notEmpty: {
          msg: 'Name required!'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Price cannot be negative'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Stock cannot be negative'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};