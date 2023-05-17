"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          user_id: 1,
          name: "Potatoes",
          price: 100,
          weight: "1 Kg",
          size: "20 Cm",
          description: "Keripik tela curah",
          SKU: "KTC1",
          image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Tomatoes - Vine Ripe, Yellow",
          price: 200,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Tomatoes - Vine Ripe, Yellow a fresh products taken directly from suppliers",
          SKU: "415202189595",
          image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Pork - Hock And Feet Attached",
          price: 300,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Pork - Hock And Feet Attached a fresh products taken directly from suppliers",
          SKU: "123339205190",
          image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Wine - White, Schroder And Schyl",
          price: 400,
          weight: "50 grams",
          size: "1 Pcs",
          description:
            "Wine - White, Schroder And Schyl a fresh products taken directly from suppliers",
          SKU: "731750098879",
          image:'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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
