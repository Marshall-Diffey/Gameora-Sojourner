"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Topics",
      [
        {
          type: "Sandbox",
        },
        {
          type: "Real-Time Strategy",
        },
        {
          type: "Shooters",
        },
        {
          type: "MOBA",
        },
        {
          type: "MMORPG",
        },
        {
          type: "Survival & Horror",
        },
        {
          type: "Simulation/Sports",
        },
        {
          type: "Puzzlers",
        },
        {
          type: "Action/Adventure",
        },
        {
          type: "Platformer",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Topics", {
      id: { [Sequelize.Op.gt]: 0 },
    });
  },
};
