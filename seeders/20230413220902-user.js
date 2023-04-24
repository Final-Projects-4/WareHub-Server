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
        {
          first_name: "Cherokee",
          last_name: "Cody",
          email: "cody_cherokee5658@outlook.com",
          username: "cherokee",
          password: "QLU82MJT6TA",
          address: "378-7923 Magna. Street",
          company: "Ante Vivamus Associates",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {restartIdentity: true ,truncate: true, cascade: true});
  },
};
