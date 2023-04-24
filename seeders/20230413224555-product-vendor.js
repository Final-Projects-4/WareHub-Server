"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProductVendors",
      [
        {
          product_id: 1,
          vendor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 1,
          vendor_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 3,
          vendor_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductVendors", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
