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
router.get('/auth', asyncHandler(async (req, res) => {
    let authorized;
    if (req.session.auth) {
        return res.json({ authorized: true });
    } else {
        return res.json({ authorized: false });
    }
}))

router.post('/', requireAuth, commentValidations, asyncHandler(async (req, res) => {
    const { newComment, } = req.body;
    const { userId } = req.session.auth;
    const questionId = parseInt(req.body.questionId, 10)
    const question = await db.Question.findByPk(questionId);
    const comments = await db.Comment.findAll({ where: { questionId } });

    const comment = db.Comment.build({
        body: newComment,
        userId,
        questionId
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await comment.save();
        res.json({ comment })
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

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await db.Comment.findByPk(commentId);
    if (comment === null) {
        return res.redirect('/');
    }
    return await db.Comment.destroy({
        where: {
            id: commentId
        }
    })
}))
router.get('/edit/:id(\\d+)', asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.id, 10)
    const getComment = await db.Comment.findByPk(commentId)
    return res.json(getComment)
}))
router.post('/edit/:id(\\d+)', asyncHandler(async (req, res) => {
    const { finalComment, commentId } = req.body
    const comment = await db.Comment.findByPk(commentId)
    console.log(comment.body)
    const updateComment = comment.update({
        body: finalComment
    })
    return updateComment.save()
}))


module.exports = router;
