const { check } = require('express-validator')
const db = require('../db/models')

const registrationsValidations = [
    check('userName')
        .exists({ checkFalsy: true })
        .withMessage('Please enter your desired username')
        .isLength({ max: 30 })
        .withMessage('The username you entered is too long')
        .custom((value) => {
            return db.User.findOne({ where: { userName: value } })
                .then((user) => {
                    if (user) return Promise.reject('The username you entered is already taken')
                })
        }),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please enter your desired email address')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .isLength({ max: 50 })
        .withMessage('The email you entered is too long')
        .custom((value) => {
            return db.User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) return Promise.reject('The email you entered is already taken')
                })
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please enter your desired password')
        .isLength({ max: 50 })
        .withMessage('The password you entered is too long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please confirm your desired password')
        .isLength({ max: 50 })
        .withMessage('Your confirmed password is too long')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Your passwords did not match')
            }
            return true
        })
]

module.exports = registrationsValidations
