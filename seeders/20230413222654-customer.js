"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Customers",
      [
        {
          user_id: 1,
          first_name: "Jonantan",
          last_name: "Fredrein",
          email: "Jonfed36@gmail.com",
          address: "Jl Singapur no 55",
          company: "PT Suka Bakso",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
