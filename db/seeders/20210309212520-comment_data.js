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
      "Comments",
      [
        {
          body: "I love Herobrine",
          userId: 6,
          questionId: 1,
        },
        {
          body: "I think 'Total War' is the best strategy game of 2020",
          userId: 7,
          questionId: 2,
        },
        {
          body:
            "Sometime at the end of the 37th century is the current trajectory",
          userId: 8,
          questionId: 3,
        },
        {
          body: "Duh! League of Legends. Why? Because its initials spell Lol!",
          userId: 9,
          questionId: 4,
        },
        {
          body: "Killing Boars!",
          userId: 10,
          questionId: 5,
        },
        {
          body:
            "If I remember correctly you just run up to them when they are on the ground and hit the tackled button,  and you should front flip and body slam them",
          questionId: 6,
          userId: 1,
        },
        {
          body:
            "Early Pay-Out - To quickly accumulate plenty of cash early on, shoot a Zombie's chest (and the chest only) with four to five bullets from your pistol before killing it with your knife. This nets you the maximum amount of money for a single zombie, and the zombies in the first three waves are weak enough to let you use this approach.",
          questionId: 7,
          userId: 2,
        },
        {
          body:
            "The best advise I can give is look at your column hits number and try to calculate the squares where no matter what combinations you use, a square would have to go there.  And use that as a base",
          questionId: 8,
          userId: 3,
        },
        {
          body:
            "This spud is extremely easy to deal with. He'll sit on the right side of your screen and shoot clumps of dirt at you. The speed of his projectiles varies per volley, not per individual shot, so get in the rhythm of dodging them, using the first two as an example. His fourth projectile will always be a worm instead of dirt. Use Cuphead's parry move on it to gain some cards. If you are shooting the Potato constantly (and you should, since you never have to turn in this phase), he should go down after about three volleys.",
          questionId: 9,
          userId: 4,
        },
        {
          body:
            "Bloodhound is the very best scout in Apex Legends in my opinion. Their Tactical ability is a long-range conical scan which highlights enemies through walls and tracks them for a short while, lending your team tremendous knowledge which can let you make the best possible decisions. Bloodhound also has a great mobility option in their Ultimate, which gives them increased speed for a while, and turns the world greyscale and enemies red, making it easier to see threats. Overall, a fantastically powerful and very popular Legend with unparalleled enemy positional awareness when it counts",
          questionId: 10,
          userId: 5,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", {
      id: { [Sequelize.Op.gt]: 0 },
    });
  },
};
