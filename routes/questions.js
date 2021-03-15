const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { validationResult, check } = require('express-validator')
const { requireAuth } = require('../auth')

// this route displays a new question form that users can fill out to submit and create a new question
router.get('/', csrfProtection, requireAuth, asyncHandler(async (req, res) => {
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
];

// route below this line was causing unhandled promise error
// this route adds a question to the database and redirects to '/' after a fills out the question form and clicks the submit button
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

// this route should display a specific question and its comments when a question is clicked
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId);
    const comments = await db.Comment.findAll({
        where: { questionId }, order: [
            ['createdAt', 'asc']
        ]
    })
    if (question === null) {
        return res.redirect('/'); // would like to send error message or error in pug file in case of question being deleted mid get request
    }
    const { title } = question;
    if (req.session.auth) {
        var { userId } = req.session.auth // using var to scope variable to function so that res.render has access to it
    }
    return res.render('question', {
        title,
        comments,
        question,
        csrfToken: req.csrfToken(),
        userId
    })
}))

// this route deletes specific questions and the related comments
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId);
    await db.Comment.destroy({
        where: { questionId: questionId }
    })
    if (question === null) {
        return res.redirect('/');
    }
    return await question.destroy({
        where: { id: questionId }
    }).end()
}))

// this route displays a specific question
router.get('/edit/:id(\\d+)', asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10)
    const question = await db.Question.findByPk(questionId)

    res.json(question)

}))

// this route edits a specific question
router.post('/:id(\\d+)/edit', asyncHandler(async (req, res) => {
    const { finalTitle, finalQuestion, questionId } = req.body
    const question = await db.Question.findByPk(questionId)
    const updatedQuestion = question.update({
        title: finalTitle,
        body: finalQuestion
    })
    question.save()
    res.json(updatedQuestion)
}))
router.get('/auth/:id(\\d+)', asyncHandler(async (req, res) => {
    console.log('-----------------------------------------------')
    const questionId = parseInt(req.params.id, 10)
    const question = await db.Question.findByPk(questionId)


    if (question.userId === req.session.auth.userId) {
        return res.json({ authorized: 'yes' });
    } else {
        return res.json({ authorized: 'no' });
    }
}))

module.exports = router;
