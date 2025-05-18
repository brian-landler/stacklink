import type { Request, Response } from 'express'
import slug from 'slug'
import formidable from 'formidable'
import {v4 as uuid} from 'uuid'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'
import { validationResult } from 'express-validator'
import { generateJWT } from '../utils/jwt'
import cloudinary from '../config/cloudinary'

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

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { description, links } = req.body
        // Checking if handler already exists
        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({handle})
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Unavailable user name')
            res.status(409).json({error: error.message})
            return
        }

        // Update user
        req.user.description = description
        req.user.handle = handle
        req.user.links = links
        
        await req.user.save()
        res.send('Your information has been updated correctly!')        
    } catch (e) {
        const error = new Error('There has been an error')
        res.status(500).json({error: error.message})
        return
    }
}


export const uploadImage = async (req: Request, res: Response) => {
    const form = formidable({multiples: false})

    try {
        form.parse(req, (error, fields, files) => {
            cloudinary.uploader.upload(
                files.file[0].filepath,
                {
                    public_id: uuid(),
                    folder: 'uploads',
                    quality: "auto",        // Let Cloudinary pick optimal compression
                    fetch_format: "auto",   // WebP/AVIF when available
                    transformation: [
                      { width: 1000, crop: "limit" }, // Don't upscale images beyond 1000px
                    ]
                },
                async function(error, result) {
                    if (error) {
                        const error = new Error('There has been an error uploading the image')
                        res.status(500).json({error: error.message})
                    }
                    if (result) {
                        req.user.image = result.secure_url
                        await req.user.save()
                        res.json({image: result.secure_url})
                    }
                })
        })
    } catch (e) {
        const error = new Error('There has been an error')
        res.status(500).json({error: error.message})
        return
    }
}

export const getUserByHandle = async (req: Request, res: Response) => {
    try {
        const { handle } = req.params
        const user = await User.findOne({handle}).select('-_id -__v -email -password')

        if (!user) {
            const error = new Error('User not found')
            res.status(404).json({error: error.message})            
        }

        res.json(user)
        
        return
    } catch (e) {
        const error = new Error('There has been an error')
        res.status(500).json({error: error.message})
        return
    }
}