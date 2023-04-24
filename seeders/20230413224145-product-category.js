"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProductCategories",
      [
        {
          product_id: 1,
          category_id: 1,
          name: "Grocery",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          category_id: 2,
          name: "Elektronik",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductCategories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
