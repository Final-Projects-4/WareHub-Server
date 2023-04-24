"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Vendors",
      [
        {
          name: "Apple",
          country: "Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung",
          country: "Canada",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nokia",
          country: "Brazil",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Blackberry",
          country: "Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Motorolla",
          country: "China",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vendors", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
