const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { validationResult, check } = require('express-validator')
const { requireAuth } = require('../auth')

const commentValidations = [
    check('newComment')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for the comment')
];

 router.post('/', csrfProtection, requireAuth, commentValidations, asyncHandler(async (req, res) => {
    const {newComment} = req.body;
    const { userId } = req.session.auth;
    const questionId = parseInt(req.body.questionId, 10)
    const question = await db.Question.findByPk(questionId);
    const comments = await db.Comment.findAll({where: {questionId}});

    console.log(newComment);
    console.log(questionId);

    const comment = db.Comment.build({
        body: newComment,
        userId,
        questionId
    });
    const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {

          await comment.save();
           return req.session.save(() => {
            res.redirect(`/questions/${questionId}`)
           })
      } else {
          const topics = await db.Topic.findAll();
          const errors = validatorErrors.array().map(error => error.msg)
          return res.render('question', {
              title: 'Comment Error',
              comments,
              question,
              csrfToken: req.csrfToken(),
              errors,
              userId
          })
      }
 }));
// going to edit this route to delete comments, not questions
 router.delete('/:id(\\d+)', requireAuth, asyncHandler(async(req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId);
    if (question === null) {
        return res.redirect('/');
    }
    return await question.destroy({
        where: { id: questionId }
    }).end()
 }))

// router.delete('/:id',)
// router.put('/:id',) bonus route if we have time to implement question editing

module.exports = router;
