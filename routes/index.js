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
router.get('/register', csrfProtection, (req, res) => {
  //const newUser = user.build()

  res.render('register', { csrfToken: req.csrfToken(), title: 'Register' })

})
router.post('/register', csrfProtection, registrationsValidations, asyncHandler(async (req, res) => {
  const {
    userName,
    email,
    password
  } = req.body

  const newUser = user.build({
    userName,
    email,
    password
  })

  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10)
    newUser.hashedPassword = hashedPassword
    await newUser.save();
    loginUser(req, res, newUser)
    return res.redirect('/')
  } else {
    const errors = validatorErrors.array().map(error => error.msg)
    console.log(errors)
    res.render('register', {
      title: 'Register',
      errors,
      newUser,
      csrfToken: req.csrfToken()
    })
  }
}))




module.exports = router;
