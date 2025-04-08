'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: 'UserRoles',
        foreignKey: 'RoleId',
        otherKey: 'UserId'
      })
      Role.belongsToMany(models.Permission, {
        through: 'RolePermissions',
        foreignKey: 'RoleId',
        otherKey: 'PermissionId'
      })
      Role.hasMany(models.UserRole, {foreignKey: 'RoleId'})
      Role.hasMany(models.RolePermission, {foreignKey: 'RoleId'})
    }
  }
  Role.init({
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
    modelName: 'Role',
  });
  return Role;
};