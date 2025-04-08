'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsTo(models.User, {foreignKey: 'UserId'})
      UserRole.belongsTo(models.Role, {foreignKey: 'RoleId'})
    }
  }
  UserRole.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User required!'
        }
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};