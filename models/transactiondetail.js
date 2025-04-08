'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionDetail.belongsTo(models.TransactionHeader, {foreignKey: 'TransactionHeaderId'})
      TransactionDetail.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  }
  TransactionDetail.init({
    TransactionHeaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Transaction header required!'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product required!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price required!'
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Qty required!'
        }
      }
    },
    subtotal: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate: (detail, options) => {
        detail.subtotal = detail.price * detail.qty
      }
    },
    sequelize,
    modelName: 'TransactionDetail',
  });

  return TransactionDetail;
};