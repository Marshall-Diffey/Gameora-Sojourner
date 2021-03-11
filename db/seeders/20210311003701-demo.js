"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const password = await bcrypt.hash("password", 10);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "demo",
          email: "demo@gmail.com",
          hashedPassword: password,
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", {
      id: { [Sequelize.Op.gt]: 0 },
    });
  },
};
