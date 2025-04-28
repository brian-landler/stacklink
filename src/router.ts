import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount } from './handlers'

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
        .withMessage('Name can not be empty'),
    createAccount)

export default router