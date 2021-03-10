// delete, put, get /question/:id
// post /questions
// if pug questions break, try space after = sign before variables
const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { validationResult, check } = require('express-validator')
const registrationsValidations = require('./registerValidations')
const { requireAuth } = require('../auth')


router.get('/', csrfProtection, requireAuth, asyncHandler(async(req, res) => {
    const topics = await db.Topic.findAll();

    
    res.render('new-question', {
        csrfToken: req.csrfToken(),
        topics,
        title: "New Question"
    })
}));

const questionValidations = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for the Title')
      .isLength({ max: 40 })
      .withMessage('Title cannot exceed 40 characters'),
    check('body')
     .exists({ checkFalsy: true })
     .withMessage('Please provide a value for the question')

]

 router.post('/',async (req, res) => {
     
    const {
        title,
        topic,
        body,
    } = req.body;

    const newQuestion = db.Question.build({
        title,
        topic,
        body
    });
    const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
          console.log('here')
          await newQuestion.save();
          return res.redirect('/')
            
      } else {
          const errors = validatorErrors.array().map(error => error.msg)
         return res.render('questions', {
              title: 'New Question',
              topic,
              body,
              csrfToken: req.csrfToken()
          })
      }

 });
// router.get('/:id',
// router.delete('/:id',)


module.exports = router;
