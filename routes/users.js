const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { validationResult, check } = require('express-validator')
const registrationsValidations = require('./registerValidations')
const bcrypt = require('bcryptjs')
const { loginUser, logOutUser } = require('../auth')


// this route displays the registration page to create a new user account
router.get('/register', csrfProtection, (req, res) => {
    res.render('register', { csrfToken: req.csrfToken(), title: 'Register' })
})

// this route creates a new user account in the database
router.post('/register', csrfProtection, registrationsValidations, asyncHandler(async (req, res) => {
    const {
        userName,
        email,
        password
    } = req.body

    const newUser = db.User.build({
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
        return req.session.save(() => {
            res.redirect('/')
        })
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

// this route logs a user into their account
router.get('/login', csrfProtection, (req, res, next) => {
    res.render('login', { title: 'Log In', csrfToken: req.csrfToken() })
});

const loginValidators = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password'),
];

// this route logs the user into the demo
router.post('/logindemo', asyncHandler(async (req, res) => {
     const email = 'demo@gmail.com';
     const user = await db.User.findOne({
         where: { email }
     });
    loginUser(req, res, user);
    res.redirect('/');
}))


router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    let errors = [];
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        const user = await db.User.findOne({
            where: { email }
        });

        if (user !== null) {
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString())
            if (passwordMatch) {
                loginUser(req, res, user);
                return req.session.save(() => {
                    res.redirect('/')
                });
            }
        }
        errors.push('Login Failed');
    } else {
        errors = validatorErrors.array().map(err => err.msg);
    }
    res.render('login', {
        title: 'Login',
        email,
        csrfToken: req.csrfToken(),
        errors
    });
}));

router.post('/logout', (req, res) => {
    logOutUser(req, res);
    return req.session.save(() => {
        res.redirect('/');
    });
})

module.exports = router
