import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

/** Auth **/
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('Handle can not be empty'),
    body('name')
        .notEmpty()
        .withMessage('Name can not be empty'),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({min:8})
        .withMessage('Password is too short'),
    handleInputErrors,
    createAccount)

router.post('auth/login',
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({min:8})
        .withMessage('Password is mandatory'),
    handleInputErrors,
    login
)

export default router