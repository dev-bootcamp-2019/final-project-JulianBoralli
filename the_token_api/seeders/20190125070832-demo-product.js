'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Product 1',
          targetPrice: 10.5,
          userId: 1,
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        {
          name: 'Product 2',
          targetPrice: 11.5,
          userId: 2,
          createdAt: new Date(), 
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('products', null, {})
  }
}
