const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils')
const db = require('../db/models')
const { Op } = require('sequelize');

router.post('/', asyncHandler(async (req, res) => {
    const { search } = req.body;
    const topics = await db.Topic.findAll({}).map(topic => topic.dataValues)
    const searchResults = await db.Question.findAll({
        where: {
            [Op.or]: {
                title: {
                    [Op.substring]: search
                },
                body: {
                    [Op.substring]: search
                }
            }
        }
    })
    return res.render('index', { title: 'Search', searchResults, topics });

}))


module.exports = router;
