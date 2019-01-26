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
      'offers',
      [
        {
          price: 9.2,
          userId: 1,
          productId: 1,
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        {
          price: 9.6,
          userId: 2,
          productId: 2,
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
    return queryInterface.bulkDelete('offers', null, {})
  }
}
