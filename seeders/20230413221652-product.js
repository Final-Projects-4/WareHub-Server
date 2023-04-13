"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          user_id: 1,
          name: "Keripik Tela",
          price: 10000,
          weight: "1 Kg",
          size: "20 Cm",
          description: "Keripik tela curah",
          SKU: "KTC1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
