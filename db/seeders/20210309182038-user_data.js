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
          userName: "Paul",
          email: "paul@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Chris",
          email: "chris@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Bob",
          email: "bob@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Stephen",
          email: "stephen@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Karen",
          email: "karen@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Reggie",
          email: "reggie@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Corey",
          email: "corey@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Ju-Ju",
          email: "ju_ju@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Svetlana",
          email: "svetlana@gmail.com",
          hashedPassword: password,
        },
        {
          userName: "Kesha",
          email: "kesha@gmail.com",
          hashedPassword: password,
        },
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
