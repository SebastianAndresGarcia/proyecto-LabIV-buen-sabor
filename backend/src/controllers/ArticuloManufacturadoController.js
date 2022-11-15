
const ArticuloManufacturado = require('../models/ArticuloManufacturado');
const DetalleArticuloManufacturado = require('../models/DetalleArticuloManufacturado');
const ArticuloInsumo = require('../models/ArticuloInsumo');
const RubroGeneral = require('../models/RubroGeneral');

exports.createArticuloManufacturado = async (req, res) => {
    const ArticuloFound = await ArticuloManufacturado.findOne({ denominacion: req.body.ArticuloManufacturado[0].denominacion })
    if (ArticuloFound)
        return res.status(301).json({ message: 'The article already exists' })
    const insumosJson = req.body.insumos
    console.log(insumosJson)

    const insumos = [];
    const keys = Object.keys(insumosJson);
    for (let x = 0; x < keys.length; x++) {
        insumos.push(insumosJson[keys[x]]);
    };
    console.log("insumos array", insumos)

    console.log(req.body.ArticuloManufacturado);
    const artmanufacturado = new ArticuloManufacturado(req.body.ArticuloManufacturado[0])
   
    const savedArtmanufacturado = await artmanufacturado.save()
    console.log(savedArtmanufacturado)
    console.log("array " + insumos.length)
    for (let i = 0; i < insumos.length; i++) {
        console.log("insumo.denominacion: " + insumos[i].denominacion+" insumo.unidadMedida: "+insumos[i].unidadMedida)
        const InsumoFound = await ArticuloInsumo.findOne({ denominacion: insumos[i].denominacion })
        console.log("InsumoFound"+InsumoFound)
        console.log("savedArtmanufacturado._id: "+savedArtmanufacturado._id)
        const detallearticulo = new DetalleArticuloManufacturado( {"cantidad":insumos[i].cantidad , "unidadMedida":insumos[i].unidadMedida, "ArticuloManufacturadoid": savedArtmanufacturado._id,"ArticuloInsumoid": InsumoFound._id})
        console.log(detallearticulo)
        const savedDetalle = await detallearticulo.save()
        console.log("savedDetalle: "+savedDetalle)
        const updateInsumo = await ArticuloInsumo.findByIdAndUpdate(InsumoFound._id, { $addToSet: { "detallearticulomanufacturadoid": savedDetalle._id } })
        const updateArtmanufacturado = await ArticuloManufacturado.findByIdAndUpdate(savedArtmanufacturado._id, { $addToSet: { "detallearticulomanufacturadoid": savedDetalle._id } })
        console.log("updateArtmanufacturado"+updateArtmanufacturado)
    }
    res.json(savedArtmanufacturado)
    /* const filter = { denominacion: req.body.insumos.denominacion };
     const update = { detallearticulomanufacturadoid: 59 };
         // `doc` is the document _before_ `update` was applied
     let doc = await Character.findOneAndUpdate(filter, update)
 */
}
exports.getArticulosManufacturados = async (req, res) => {
    const manufacturados = await ArticuloManufacturado.find()
    if (!manufacturados)
        return res.status(204).json();
    return res.json(manufacturados)
}
exports.updateArticulosManufacturados = async (req, res) => {
    const addressUpdated = await Address.findByIdAndUpdate(req.params.id, req.body)
    res.json(addressUpdated)
}