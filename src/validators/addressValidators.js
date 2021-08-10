import { check, validationResult } from 'express-validator'
export const addressValidators = [
    check('name')
        .notEmpty()
        .withMessage('name is required'),
    check('province')
        .notEmpty()
        .withMessage('province is required'),
    check('city')
        .notEmpty()
        .withMessage('city is required'),
    check('mobileNumber')
        .isLength({ min: 8, max: 11 })
        .withMessage('correct number is requried'),
    check('emailAddress')
        .isEmail()
        .withMessage('correct email is required')
]
export const isAddressValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next()
}