const express = require("express");
const db = require("../db/models");
const topicsRouter = express.Router();
const { asyncHandler } = require("./utils");

topicsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const topicId = parseInt(req.params.id, 10);
    const questions = await db.Question.findAll({
      where: {
        topicId,
      },
    }).map((question) => question.dataValues);
    res.render("topics", { questions });
  })
);

module.exports = {topicsRouter};
