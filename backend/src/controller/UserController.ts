import { RequestHandler, Request, Response } from "express";
import User from '../models/User'

export const createUser: RequestHandler = async (req: Request, res: Response) => {
    const userFound = await User.findOne({ usuario: req.body.usuario })

    if (userFound)
        return res.status(301).json({ message: 'The user already exists' })
    const user = new User(req.body)
    console.log(user)
    const savedUser = await user.save()
    res.json(savedUser)

}
export const getUsers: RequestHandler = async (req, res) => {
    const users = await User.find()
    console.log(users)
    return res.json(users)
}
export const getUser: RequestHandler = async (req, res) => {
    const userFound = await User.findById(req.params.id)
    if (!userFound)
        return res.status(204).json();
    return res.json(userFound)
}
export const updateUser: RequestHandler = async (req, res) => {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body)
    res.json(userUpdated)
}