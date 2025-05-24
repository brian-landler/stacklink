import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

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

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({min:8})
        .withMessage('Password is mandatory'),
    handleInputErrors,
    login
)

router.get('/user', authenticate, getUser)
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('Handle can not be empty'),
    handleInputErrors,
    authenticate,
    updateProfile)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage('Handle can not be empty'),
    handleInputErrors,
    searchByHandle
)

export default router