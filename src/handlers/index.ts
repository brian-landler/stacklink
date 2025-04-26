import type { Request, Response } from 'express'
import User from "../models/User"

export const createAccount = async (req: Request, res: Response) => {
    const user = new User(req.body)
    res.send('ACK')

    await user.save()
}