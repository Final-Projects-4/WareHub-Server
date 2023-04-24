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
        {
          user_id: 2,
          name: "Tomatoes - Vine Ripe, Yellow",
          price: 3000,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Tomatoes - Vine Ripe, Yellow a fresh products taken directly from suppliers",
          SKU: "415202189595",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Pork - Hock And Feet Attached",
          price: 10000,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Pork - Hock And Feet Attached a fresh products taken directly from suppliers",
          SKU: "123339205190",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          name: "Wine - White, Schroder And Schyl",
          price: 4000,
          weight: "50 grams",
          size: "1 Pcs",
          description:
            "Wine - White, Schroder And Schyl a fresh products taken directly from suppliers",
          SKU: "731750098879",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {restartIdentity: true ,truncate: true, cascade: true});
  },
};
