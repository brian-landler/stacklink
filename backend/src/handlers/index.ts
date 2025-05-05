import type { Request, Response } from 'express'
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'
import { validationResult } from 'express-validator'
import { generateJWT } from '../utils/jwt'

export const createAccount = async (req: Request, res: Response) => {  
    const { email, password } = req.body

    // Checking if email address already exists
    const userExists = await User.findOne({email})
    if (userExists) {
        const error = new Error('The email account is already in use')
        res.status(409).json({error: error.message})
        return
    }

    // Checking if handler already exists
    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})
    if (handleExists) {
        const error = new Error('Unavailable user name')
        res.status(409).json({error: error.message})
        return
    }

    // Save new user
    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle
    await user.save()
    res.status(201).send('User created successfully') 
}

export const login = async (req: Request, res: Response) => {    
    const { email, password } = req.body

    // Checking that user already exists
    const user = await User.findOne({email})
    if (!user) {
        const error = new Error('Incorrect email address.') // In production, for security reasons, the message would be 'Email address does not exist or password is incorrect.'
        res.status(404).json({error: error.message})
        return
    }

    const isPasswordCorrect = await checkPassword(password, user.password)

    if(!isPasswordCorrect) {
        const error = new Error('Incorrect password.') // In production, for security reasons, the message would be 'Email address does not exist or password is incorrect.'
        res.status(401).json({error: error.message})
        return
    }

    const token = generateJWT({id: user._id})

    res.send(token)
}