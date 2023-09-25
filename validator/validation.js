const { body } = require('express-validator')

const validateUserInput = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters")
]
const validatePinInput = [
    body('pin')
        .notEmpty()
        .withMessage('Pin is required')
        .isLength({ min: 4, max: 4 })
        .withMessage("Pin must be 4 characters")
]
const validateBenefInput = [
    body('name')
        .notEmpty()
        .withMessage('Pin is required')

]
const validateDepositInput = [
    body('amount')
        .notEmpty()
        .withMessage('Amount is required')

]

const validateDonationInput = [
    body('pin')
        .notEmpty()
        .withMessage('Pin is required')
        .isLength({ min: 4, max: 4 })
        .withMessage("Pin must be 4 characters"),
    body('amount')
        .notEmpty()
        .withMessage('Amount is required'),
    body('beneficiary_id')
        .notEmpty()
        .withMessage('Beneficiary is required')

]


const validateEmailInput = [
    body('to')
        .notEmpty()
        .withMessage('Message to is required'),

    body('subject')
        .notEmpty()
        .withMessage('Subject is required'),
    body('message')
        .notEmpty()
        .withMessage('Message is required')

]
module.exports = {
    validateUserInput,
    validatePinInput,
    validateBenefInput,
    validateDepositInput,
    validateDonationInput,
    validateEmailInput
}