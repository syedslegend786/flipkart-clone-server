import { check, validationResult } from 'express-validator'
export const signUpValidator = [
    check('firstName')
        .notEmpty()
        .withMessage('FirstName is required'),
    check('lastName')
        .notEmpty()
        .withMessage('LastName is required'),
    check('email')
        .isEmail()
        .withMessage('valid email is required'),
    check('password')
        .notEmpty()
        .withMessage('password is required')
]
export const signInValidator = [
    check('email')
        .isEmail()
        .withMessage('valid email is required'),
    check('password')
        .notEmpty()
        .withMessage('password is required')
]
export const isSignUpValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next()
}