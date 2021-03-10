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
    // check('topics')
    //   .custom(async(value) => {
    //       const realTopic = await db.Topic.findByPk(value)
    //       if (!realTopic) {
    //           throw new Error('Quit trolling, mate');
    //       }
    //       return true;
    //   })


];

// route below this line was causing unhandled promise error
 router.post('/', csrfProtection, requireAuth, questionValidations, asyncHandler(async (req, res) => {
     const {
         title,
         topics, //this references pug value attribute "topic.id"
         body,
        } = req.body;
        const topic = await db.Topic.findByPk(topics) //finding topic object
        const { userId } = req.session.auth

    const newQuestion = db.Question.build({
        title,
        topicId: topic.id,
        body,
        userId
    });
    const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {

          await newQuestion.save();
           return req.session.save(() => {
               res.redirect('/')
           })
      } else {
          const topics = await db.Topic.findAll();
          const errors = validatorErrors.array().map(error => error.msg)
          return res.render('new-question', {
              title: 'New Question',
              topics,
              body,
              csrfToken: req.csrfToken(),
              errors
          })
      }
 }));

 router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId); //{include: ['userId', 'topicId']}
    const comments = await db.Comment.findAll({where: {questionId}})
    //console.log(question);
    if(question === null) {
        //const error = new Error(''); possibly res.send an error instead of redirecting
        console.log(';lkajsdf')
        return res.redirect('/'); // would like to send error message or error in pug file in case of question being deleted mid get request
    }
    const {title} = question;
    console.log('a;lksjdfl;kajsdfl;');
    return res.render('question', {
        title,
        comments,
        question,
        csrfToken: req.csrfToken()
    })
 }))

// router.delete('/:id',)


module.exports = router;
