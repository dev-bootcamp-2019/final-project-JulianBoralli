'use strict'
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    'Offer',
    {
      price: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    },
    {
      tableName: 'offers'
    }
  )
  
  Offer.associate = function (models) {
    Offer.belongsTo(models.User, {foreignKey: 'userId'})
    Offer.belongsTo(models.Product, {foreignKey: 'productId'})
  }
  return Offer
}
