"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Foods",
          description: " Generic foods category ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electronics",
          description: " zapp zapp ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Plastics",
          description: " oppa korea ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jewelry",
          description: "cling cling",
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
