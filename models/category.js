'use strict';
const {Op} = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: 'ProductCategories',
        foreignKey: 'CategoryId',
        otherKey: 'ProductId'
      })
    }

    static async findAllCategory(name) {
      try {
        let options = {}
        if (name) {
          options.where = {
            name: {
              [Op.iLike]: `%${name}%`
            }
          }
        }

        const data = await Category.findAll(options)

        return data
      } catch (error) {
        throw error
      }
    }
  }
  Category.init({
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
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};