import { RequestHandler, Request, Response } from "express";
import Rubro from '../models/RubroArticulo'

export const createRubroArticulo: RequestHandler = async (req: Request, res: Response) => {
    const rubroFound = await Rubro.findOne({ "denominacionRubroPadre": req.body.denominacionRubroPadre })
    if (rubroFound)
        return res.status(301).json({ message: 'The rubro already exists' })
    const rubro = new Rubro(req.body)
    console.log(rubro)
    const savedRubro = await rubro.save()
    res.json(savedRubro)
}

export const agregarSubRubro: RequestHandler = async (req: Request, res: Response) => {
    const rubroFound = await Rubro.findOne({ "rubropadreid": req.body.rubropadreid })
    console.log("subrubro :", rubroFound)
    if (rubroFound) {
        console.log("rubroFound._id= " + rubroFound._id)
        const rubroUpdated = await Rubro.findByIdAndUpdate(req.body.rubropadreid, { $addToSet: { "rubrohijo": req.body } })
        console.log(rubroUpdated?.$getAllSubdocs)
        res.json(rubroUpdated)
    } else {
        return res.status(301).json({ message: 'Rubroid no encontrado' })
    }
}
export const agregarArticuloRubro: RequestHandler = async (req: Request, res: Response) => {
    const rubroFound = await Rubro.findOne({ "_id": req.body._id })
     if (rubroFound) {
         console.log("entró")
         const rubroUpdated = await Rubro.findOneAndUpdate(
             { "rubrohijo.denominacionRubroHijo": req.body.denominacionRubroHijo },
             { $addToSet: { "rubrohijo.$.articulos":  {"rubropadreid": req.body.rubropadreid, "denominacionArticulo": req.body.denominacionArticulo, "marca": req.body.marca }  } }
         )
         res.json(rubroUpdated)
     } else {
         return res.status(301).json({ message: 'Rubroid no encontrado' })
     } 
    }
/*
    const rubroFound = await Rubro.findOne({ "_id": req.body._id })
    if (rubroFound) {
        let userData = { denominacionRubroHijo: req.body.denominacionRubroHijo }
        let dataToBeUpdated = { articulos: {"denominacionArticulo":req.body.denominacionArticulo , "rubropadreid": req.body.rubropadreid} }
        const rubroUpdated = await Rubro.updateOne({ "rubrohijo.denominacion": userData.denominacionRubroHijo }, { $push: { "rubrohijo.$": dataToBeUpdated } })

        res.json(rubroUpdated)
    } else {
        return res.status(301).json({ message: 'Rubroid no encontrado' })
    }
} */

export const getRubros: RequestHandler = async (req, res) => {
    const rubros = await Rubro.find()
    console.log(rubros)
    return res.json(rubros)
}
export const getRubro: RequestHandler = async (req, res) => {
    const rubroFound = await Rubro.findById(req.params.id)
    if (!rubroFound)
        return res.status(204).json();
    return res.json(rubroFound)
}
export const updateRubro: RequestHandler = async (req, res) => {
    const rubroUpdated = await Rubro.findByIdAndUpdate(req.params.id, req.body)
    res.json(rubroUpdated)
}