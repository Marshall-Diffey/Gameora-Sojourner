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
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Game-Ora Home' });
});





module.exports = router;
