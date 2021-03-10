const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const user = db.User
const { validationResult, check } = require('express-validator')
const registrationsValidations = require('./registerValidations')
const bcrypt = require('bcryptjs')
const loginUser = require('../auth')


/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const questions = await db.Question.findAll({}).map(question => question.dataValues)
  const topics = await db.Topic.findAll({}).map(topic => topic.dataValues)
  console.log(topics)

  res.render('index', { title: 'Game-Ora Home', questions, topics });
}));






module.exports = router;
