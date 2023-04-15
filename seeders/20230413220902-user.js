"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: "John",
          last_name: "Doe",
          email: "JohnDoe@gmail.com",
          username: "JohnD3664",
          password: "JoD!@#ff",
          address: "Jln Raya kenangan no 27",
          company: "JohnDoe-Corp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
