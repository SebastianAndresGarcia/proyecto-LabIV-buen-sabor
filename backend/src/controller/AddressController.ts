import { RequestHandler, Request, Response } from "express";
import Address from '../models/Address'
import User from "../models/User";

export const createAddress: RequestHandler = async (req: Request, res: Response) => {
    //const AddressFound = await Address.findOne({ usuario: req.body.usuario })
    //const user = await User.findById(req.body.id)
    const address = new Address(req.body)
    console.log(address)
    try {
        const savedAddress = await address.save()
        const userUpdated =await User.findByIdAndUpdate(req.body.userid, {$addToSet:{"domicilios":savedAddress._id}})
        console.log(userUpdated)
        res.json(savedAddress)
        
    } catch (error) {
        console.log(error)
    }

}

export const getAddressbyuser: RequestHandler = async (req, res) => {
    const addressFound = await Address.find({ "user": req.params.id })
    if (!addressFound)
        return res.status(204).json();
    return res.json(addressFound)
}
export const updateAddress: RequestHandler = async (req, res) => {
    const addressUpdated = await Address.findByIdAndUpdate(req.params.id, req.body)
    res.json(addressUpdated)
}