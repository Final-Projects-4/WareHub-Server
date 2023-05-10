"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Grocery",
          description: " Kebutuhan Sehari Hari ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Elektronik",
          description: " 123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Film",
          description: " 123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jewelry",
          description: "List Items Kategory Jewelry",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
