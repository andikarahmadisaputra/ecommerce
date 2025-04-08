'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDetail.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  UserDetail.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name required!'
        },
        notEmpty: {
          msg: 'Name reqired!'
        }
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    birthDate: {
      type: DataTypes.DATE
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
    modelName: 'UserDetail',
  });
  return UserDetail;
};