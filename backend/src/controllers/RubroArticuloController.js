//import { RequestHandler, Request, Response } from "express";
const RubroArticulo = require("../models/RubroArticulo");

exports.createRubroArticuloPadre = async (req, res) => {
    const ArticuloFound = await RubroArticulo.findOne({ denominacion: req.body.denominacion })
    if (ArticuloFound)
        return res.status(301).json({ message: 'The article already exists' })
    const articulo = new RubroArticulo(req.body)
    console.log(articulo)
    try {
        const savedArticulo = await articulo.save()
        res.json(savedArticulo)
    } catch (error) {
        console.log(error)
    }
}
exports.addChildArticuloPadre = async (req, res) => {

    var hijo = new RubroArticulo(req.body)
    hijo.padre = req.body.padreid
    console.log(hijo)
    try {
        // Agregar el hijo a la lista de hijos del padre
        //padre.hijos.push(hijo);
        // Guardar los cambios en la base de datos
        await hijo.save();
        const padreUpdated = await RubroArticulo.findByIdAndUpdate(hijo.padre, { $addToSet: { "hijos": hijo._id } })
        res.json(hijo)
    } catch (error) {
        console.log(error)
    }
}
async function obtenerArbolCompleto(padre) {
    if (padre.hijos.length > 0) {
        padre = await RubroArticulo.populate(padre, { path: "hijos" });
        for (let i = 0; i < padre.hijos.length; i++) {
            padre.hijos[i] = await obtenerArbolCompleto(padre.hijos[i]);
        }
    }
    return padre;
}

exports.obtenerArbolDeArticuloPadre = async (req, res) => {
    try {
        const padre = await RubroArticulo.findById(req.params.id).populate("hijos");
        const arbolCompleto = await obtenerArbolCompleto(padre);
        res.status(200).json([arbolCompleto]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};


exports.createRubroArticulo = async (req, res) => {
    console.log(req.body)
    /*const rubroFound = await Rubro.findOne({ "denominacionRubroPadre": req.body.denominacionRubroPadre })
    if (rubroFound)
        return res.status(301).json({ message: 'The rubro already exists' }) 
    const rubro = new RubroArticulo(req.body)
    console.log(rubro)
    const savedRubro = await rubro.save()
    res.json(savedRubro)*/
    let parent = req.body.parent ? req.body.parent : null;
    console.log("parent" + parent)
    const rubro = new RubroArticulo({ denominacion: req.body.denominacion, parent, esInsumo: req.body.esInsumo })

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
        const result = await RubroArticulo.find({ denominacion: req.params.id })
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
        const result = await RubroArticulo.find({ "ancestors._id": req.params.id })

            .select({ "_id": false, "denominacion": true, "parent": true, "ancestors": true })
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
    const rubros = await RubroArticulo.find({ "parent": null, "esInsumo": true })
    console.log(rubros)
    return res.json(rubros)
}
exports.getRubrosNoInsumos = async (req, res) => {
    const rubros = await RubroArticulo.find({ "parent": null, "esInsumo": false })
    console.log(rubros)
    return res.json(rubros)
}

exports.getRubrosFalseInsumos = async (req, res) => {

    const resultado = []
    const rubros = await RubroArticulo.find
        ({}).where('articuloinsumoid').ne([])
        .populate({
            path: "articuloinsumoid",
            match: { "esInsumo": false },
            select: { denominacion: 1, RubroArticuloid: 1 }
        })
    for (let i = 0; i < rubros.length; i++) {
        if (rubros[i].articuloinsumoid.length > 0)
            resultado.push(rubros[i])
    }
    console.log(resultado)
    return res.json(resultado)
}

exports.updateRubroArticulo = async (req, res) => {
    const rubroUpdated = await RubroArticulo.findByIdAndUpdate(req.body._id, { $addToSet: { "articuloinsumoid": req.body.articuloinsumoid } })
    console.log(rubroUpdated)
    res.json(rubroUpdated)
}