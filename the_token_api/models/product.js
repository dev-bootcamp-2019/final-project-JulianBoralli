'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      targetPrice: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      tableName: 'products'
    }
  )
  Product.associate = function (models) {
    Product.belongsTo(models.User, {foreignKey: 'userId'})
    Product.hasMany(models.Offer, {foreignKey: 'productId'})
  }
  return Product
}
