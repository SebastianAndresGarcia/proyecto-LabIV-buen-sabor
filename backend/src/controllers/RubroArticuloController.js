//import { RequestHandler, Request, Response } from "express";

const RubroArticulo = require("../models/RubroArticulo");


exports.createRubroArticulo = async (req, res) => {
    /*const rubroFound = await Rubro.findOne({ "denominacionRubroPadre": req.body.denominacionRubroPadre })
    if (rubroFound)
        return res.status(301).json({ message: 'The rubro already exists' }) 
    const rubro = new RubroArticulo(req.body)
    console.log(rubro)
    const savedRubro = await rubro.save()
    res.json(savedRubro)*/
    let parent = req.body.parent ? req.body.parent : null;
    console.log("parent" + parent)
    const rubro = new RubroArticulo({ denominacion: req.body.denominacion, parent })

    try {
        console.log("rubro", rubro)
        const newRubroArticulo = await rubro.save();
        console.log("newRubroArticulo", newRubroArticulo)
        buildAncestors(newRubroArticulo._id, parent)
        res.json(newRubroArticulo)
        //res.status(201).send({ response: `Rubro ${newRubroArticulo._id}` });
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}
const buildAncestors = async (id, parent_id) => {
    let ancest = [];
    try {
        let parent_category = await RubroArticulo.findOne({ "_id": parent_id }, { "denominacion": 1, "ancestors": 1 }).exec();
        if (parent_category) {
            const { _id, denominacion } = parent_category;
            const ancest = [...parent_category.ancestors];
            ancest.unshift({ _id, denominacion })
            const category = await RubroArticulo.findByIdAndUpdate(id, { $set: { "ancestors": ancest } });
        }
    } catch (err) {
        console.log(err.message)
    }
}

exports.getAncestorsRubroArticulo = async (req, res) => {
    try {
        const result = await RubroArticulo.find({ denominacion: req.body.denominacion })
            .select({
                "_id": false,
                "denominacion": true,
                "ancestors.denominacion": true
            }) 
            .exec();
        res.status(201).send({ "status": "success", "result": result });
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getDescendentsRubroArticulo = async (req, res) => {
    try {
        const result = await RubroArticulo.find( {"ancestors._id" : req.body._id })
       
            .select({ "_id": false, "denominacion": true, "parent": true })
            .exec();
        
        res.status(201).send({ "status": "success", "result": result });
    } catch (err) {
        res.status(500).send(err);
    } 
}


exports.agregarSubRubro = async (req, res) => {
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

exports.agregarArticuloRubro = async (req, res) => {
    const rubroFound = await Rubro.findOne({ "_id": req.body._id })
    if (rubroFound) {
        console.log("entró")
        const rubroUpdated = await Rubro.findOneAndUpdate(
            { "rubrohijo.denominacionRubroHijo": req.body.denominacionRubroHijo },
            { $addToSet: { "rubrohijo.$.articulos": { "rubropadreid": req.body.rubropadreid, "denominacionArticulo": req.body.denominacionArticulo, "marca": req.body.marca } } }
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

exports.getRubros = async (req, res) => {
    const rubros = await RubroArticulo.find({ "parent": null })
    console.log(rubros)
    return res.json(rubros)
}



exports.updateRubroArticulo = async (req, res) => {
    const rubroUpdated = await RubroArticulo.findByIdAndUpdate(req.body._id, { $addToSet: { "articuloinsumoid": req.body.articuloinsumoid } })
    console.log(rubroUpdated)
    res.json(rubroUpdated)
}