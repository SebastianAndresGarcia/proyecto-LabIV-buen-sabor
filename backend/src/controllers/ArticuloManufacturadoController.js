
const ArticuloManufacturado = require('../models/ArticuloManufacturado');
const DetalleArticuloManufacturado = require('../models/DetalleArticuloManufacturado');
const ArticuloInsumo = require('../models/ArticuloInsumo');
const RubroGeneral = require('../models/RubroGeneral');

exports.createArticuloManufacturado = async (req, res) => {
    //const ArticuloFound = await ArticuloManufacturado.findOne({ denominacion: req.body.ArticuloManufacturado[0].denominacion })
    const ArticuloFound = await ArticuloManufacturado.findOne({ denominacion: req.body.ArticuloManufacturado.denominacion })
    if (ArticuloFound)
        return res.status(301).json({ message: 'The article already exists' })
    const insumosJson = req.body.DetalleArticuloManufacturado
    console.log(insumosJson)
    const insumos = [];
    const keys = Object.keys(insumosJson);
    for (let x = 0; x < keys.length; x++) {
        insumos.push(insumosJson[keys[x]]);
    };
    console.log("insumos array", insumos)
    console.log(req.body.ArticuloManufacturado);
    const artmanufacturado = new ArticuloManufacturado(req.body.ArticuloManufacturado)
    const savedArtmanufacturado = await artmanufacturado.save()
    const updateRubroGeneral = await RubroGeneral.findByIdAndUpdate(req.body.ArticuloManufacturado.rubrogeneralid, { $addToSet: { "articulomanufacturadoid": savedArtmanufacturado._id } })
    console.log(savedArtmanufacturado)
    console.log("array " + insumos.length)
    for (let i = 0; i < insumos.length; i++) {
        console.log("insumo.articuloInsumoid: " + insumos[i].articuloInsumoid + " insumo.unidadMedida: " + insumos[i].unidadMedida)
        const InsumoFound = await ArticuloInsumo.findOne({ _id: insumos[i].articuloInsumoid })
        console.log("InsumoFound" + InsumoFound)
        console.log("savedArtmanufacturado._id: " + savedArtmanufacturado._id)
        const detallearticulo = new DetalleArticuloManufacturado({ "cantidad": insumos[i].cantidad, "unidadMedida": insumos[i].unidadMedida, "ArticuloManufacturadoid": savedArtmanufacturado._id, "ArticuloInsumoid": InsumoFound._id })
        console.log(detallearticulo)
        const savedDetalle = await detallearticulo.save()
        console.log("savedDetalle: " + savedDetalle)
        const updateInsumo = await ArticuloInsumo.findByIdAndUpdate(InsumoFound._id, { $addToSet: { "detallearticulomanufacturadoid": savedDetalle._id } })
        const updateArtmanufacturado = await ArticuloManufacturado.findByIdAndUpdate(savedArtmanufacturado._id, { $addToSet: { "detallearticulomanufacturadoid": savedDetalle._id } })
        console.log("updateArtmanufacturado" + updateArtmanufacturado)

    }
    res.json(savedArtmanufacturado)

}
exports.getArticulosManufacturados = async (req, res) => {
    const manufacturados = await ArticuloManufacturado.find()
    if (!manufacturados)
        return res.status(204).json();
    return res.json(manufacturados)
}

exports.getArticulosManufacturadosxrubro = async (req, res) => {
    const busqueda = req.params.id;
    /*console.log("parametroRubro: ",req.params.id)
    const rubrogral = await RubroGeneral.find({ denominacion: [busqueda]});
    console.log(rubrogral) */
    var array = [] = busqueda.split(",")
    const manufacturados = await ArticuloManufacturado.find({ rubrogeneralid: array });
    if (!manufacturados)
        return res.status(204).json();
    return res.json(manufacturados)
}

exports.updateArticulosManufacturados = async (req, res) => {
    const addressUpdated = await Address.findByIdAndUpdate(req.params.id, req.body)
    res.json(addressUpdated)
}

exports.deleteArticuloManufacturado = async (req, res) => {
    const ArticuloFound = await ArticuloManufacturado.findOne({ _id: req.params.id }) //identifico el manufacturado a borrar
    const updateRubroGeneral = await RubroGeneral.findByIdAndUpdate(ArticuloFound.rubrogeneralid, { $pull: { "articulomanufacturadoid": ArticuloFound._id } }) //borro el manufacturado del array de Rubro Gral
    for (let i = 0; i < ArticuloFound.detallearticulomanufacturadoid.length; i++) { //recorro todos los detalles del articulo

        //const DetalleArtManufacturado= await findByIdAndUpdate(ArticuloFound.detallearticulomanufacturadoid[i], {$pull: { "detallearticulomanufacturadoid": {$in:ArticuloFound.detallearticulomanufacturadoid }}})
        const DetalleArtManufacturado = await DetalleArticuloManufacturado.findOne(ArticuloFound.detallearticulomanufacturadoid[i]) //ubico cada detalle
        const updateInsumo = await ArticuloInsumo.findByIdAndUpdate
            (DetalleArtManufacturado.ArticuloInsumoid, { $pull: { "detallearticulomanufacturadoid": DetalleArtManufacturado._id } })//borro el detallearticulomanufacturadoid de cada Insumo
        const eliminarDetalle = await DetalleArticuloManufacturado.deleteOne({ _id: DetalleArtManufacturado._id })//elimino cada Detalle del manufacturado

    }
    const eliminarArticulo = await ArticuloManufacturado.deleteOne({ _id: ArticuloFound._id }) //finalmente elimino el art. manufacturado
    if (!eliminarArticulo)
        return res.status(204).json();
    res.json(eliminarArticulo)
}