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
      "Questions",
      [
        {
          title: "Minecraft",
          body: "What is your favorite thing about Minecraft?",
          topicId: 1,
          userId: 1,
        },
        {
          title: "General",
          body: "What are some of the best RTS games from 2020?",
          topicId: 2,
          userId: 2,
        },
        {
          title: "Halo Infinite",
          body: "Does anyone know the official releae date?",
          topicId: 3,
          userId: 3,
        },
        {
          title: "League of legends vs Heroes of the storm",
          body: "Which do you prefer and why?",
          topicId: 4,
          userId: 4,
        },
        {
          title: "WOW",
          body: "Whats the fastest way to level to max?",
          topicId: 5,
          userId: 5,
        },
        {
          title: "NFL Blitz 2000 question",
          body:
            "Hey all, I am playing NFL Blitz 2000 and I am wondering how do I do the front flip and body slap people after the play is over, I remember doing this as a kid and it was a lot of fun, I've tried everything and can't seem to figure it out. thanks",
          topicId: 7,
          userId: 6,
        },
        {
          title: "black ops zombies strategy",
          body:
            "Hey all, So I have been playing a lot of zombies lately and I'm having a lot of fun, just wondering if there is any go to strategy that is seen as best practice? I usually run around and try to keep my windows and whatnot repaired but just looking fo a little extra advice,  thanks",
          topicId: 6,
          userId: 7,
        },
        {
          title: "picross touch 15x15 guide",
          body:
            "Hey all, Ive been playing this sudoku like game picos touch and I loved it, I just completed the 10x10 levels and started the 15x15 and am realizing the difficulty level has gone up dramatically, wondering if anyone can give me tips on how to solves these puzzles better,  thanks a lot.",
          topicId: 8,
          userId: 8,
        },
        {
          title: "Cup Head The root pack phase one potato",
          body:
            "Hey all, inb4 learn to play, I know I'm a noob,  please be easy on me. I am playing cup head and I am stuck on the phase 1 potato fight of the root pack.  I can't seem to down him no matter what.  I have been ducking and diving and digging and climbing, and I just can't do it.  Thanks Game-Ora",
          topicId: 10,
          userId: 9,
        },
        {
          title: "Apex legends best hero?",
          body:
            "hey, all I have been playing a lot of apex lately and just looking for some opinions of the best hero,  I like mirage a lot, he has been my go to.  What is your favorite and why??",
          topicId: 9,
          userId: 10,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", {
      id: { [Sequelize.Op.gt]: 0 },
    });
  },
};
