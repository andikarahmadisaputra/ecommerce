'use strict';
const bcrypt = require('bcryptjs')
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
      User.hasOne(models['UserDetail'], {foreignKey: 'UserId'})
      User.belongsToMany(models['Role'], {
        through: 'UserRoles',
        foreignKey: 'UserId',
        otherKey: 'RoleId',
        as: 'Roles'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email required!'
        },
        notEmpty: {
          msg: 'Email required!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password required!'
        },
        notEmpty: 'Password Required!'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
      validate: {
        notNull: {
          msg: 'Status required!'
        },
        notEmpty: {
          msg: 'Status required!'
        },
        isIn: {
          args: [['active', 'suspend']],
          msg: 'Status must be active or suspend'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10)
        user.status = 'active'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};