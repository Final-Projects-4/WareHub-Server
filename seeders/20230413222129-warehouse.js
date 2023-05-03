"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Warehouses",
      [
        {
          user_id: 1,
          name: "Gudang Barang Depok 1",
          city: "Depok",
          address: "Jl Penghasahan No 15",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          name: "Gudang Depok 2",
          city: "Depok",
          address: "Jl Penghasahan No 10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          city: "Matsubara",
          name: "Gudang Barang Matsubara",
          address: "9 Blackbird Place Matsubara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          city: "Bergvliet",
          name: "Gudang Barang Bergvliet",
          address: "976 Eastlawn Terrace Bergvliet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          city: "Sison",
          name: "Gudang Barang Sison",
          address: "2633 Huxley Center Sison",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Warehouses", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
