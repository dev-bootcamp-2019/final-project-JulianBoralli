'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {
      tableName: 'users'
    }
  )

  User.associate = function (models) {
    User.hasMany(models.Product, {foreignKey: 'userId'})
    User.hasMany(models.Offer, {foreignKey: 'userId'})
  }
  // Adding a class level method
  User.classLevelMethod = function () {
    return 'foo'
  }

  // Adding an instance level method
  User.prototype.instanceLevelMethod = function () {
    return 'bar'
  }

  return User
}
