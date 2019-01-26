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
      'users',
      [
        {
          username: 'User 1',
          address: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW',
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        {
          username: 'User 2',
          address: '0xfA25345ab919a8b9Fd643ce8482987117LLJKH',
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
    return queryInterface.bulkDelete('users', null, {})
  }
}
