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
        },
        {
          name: "Industrial",
          description: "List Items Kategory Industrial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Baby",
          description: "List Items Kategory Baby",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tools",
          description: "List Items Kategory Tools",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electronics",
          description: "List Items Kategory Electronics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shoes",
          description: "List Items Kategory Shoes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Music",
          description: "List Items Kategory Music",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kids",
          description: "List Items Kategory Kids",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Movies",
          description: "List Items Kategory Movies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Computers",
          description: "List Items Kategory Computers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health",
          description: "List Items Kategory Health",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Automotive",
          description: "List Items Kategory Automotive",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Books",
          description: "List Items Kategory Books",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Outdoors",
          description: "List Items Kategory Outdoors",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Garden",
          description: "List Items Kategory Garden",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Games",
          description: "List Items Kategory Games",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sports",
          description: "List Items Kategory Sports",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clothing",
          description: "List Items Kategory Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Grocery",
          description: "List Items Kategory Grocery",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toys",
          description: "List Items Kategory Toys",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Home",
          description: "List Items Kategory Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beauty",
          description: "List Items Kategory Beauty",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Misc",
          description: "List Items Kategory Misc ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
