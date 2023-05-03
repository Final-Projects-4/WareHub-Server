'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Expenses', 
      [
        {
          user_id: 1,
          expense: 40000,
          detail: "detail of product 1 & 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { user_id: 2,
          expense: 60000,
          detail: "detail of product 2 & 4",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
