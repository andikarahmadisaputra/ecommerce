'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionHeader.hasMany(models.TransactionDetail, {foreignKey: 'TransactionHeaderId'})
      TransactionHeader.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  TransactionHeader.init({
    transactionNumber: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User required!'
        }
      }
    },
    total: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate: (header, options) => {
        header.transactionNumber = `${TRX}${header.userId}-${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDay()}${new Date().getTime()}`
      }
    },
    sequelize,
    modelName: 'TransactionHeader',
  });
  return TransactionHeader;
};