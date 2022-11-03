
const ArticuloManufacturado = require('../models/ArticuloManufacturado');
const DetalleArticuloManufacturado = require('../models/DetalleArticuloManufacturado');
const ArticuloInsumo = require('../models/ArticuloInsumo');
const RubroGeneral = require('../models/RubroGeneral');


exports.createArticuloManufacturado = async (req, res) => {

    const insumosJson = req.body.insumos
    console.log(insumosJson)



    const insumos = [];
    const keys = Object.keys(insumosJson);
    for (let x = 0; x < keys.length; x++) {
        insumos.push(insumosJson[keys[x]]);
    };
    console.log("insumos array", insumos)


    //insumos= new ArticuloInsumo(JSON.Parse(req.body.insumos))
    /*for (const [key, value] of Object.entries(insumoJson)) {
        insumos.push([`${key}`, `${value}`]);
    }*/


    console.log(req.body.ArticuloManufacturado);
    const artmanufacturado = new ArticuloManufacturado(req.body.ArticuloManufacturado[0])
    //console.log(insumo);
    /*const producto = req.body.ArticuloManufacturado
    console.log(producto) */
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

    /*const insumo = await ArticuloInsumo.findOne({ denominacion: req.body.denominacion })
    const detalle = new DetalleArticuloManufacturado({
        cantidad: req.body.cantidad,
        unidadMedida: req.body.unidadMedida
    })
    //const user = await User.findById(req.body.id)
    if (insumo) {
        const articulo = new ArticuloManufacturado(req.body)
        console.log(articulo)
        try {
            const savedArticulo = await articulo.save()
            const rubroGralUpdated = await RubroGeneral.findByIdAndUpdate(req.body.rubrogeneralid, { $addToSet: { "articulomanufacturadoid": savedArticulo._id } })
            console.log(savedArticulo)
            res.json(rubroGralUpdated)

        } catch (error) {
            console.log(error)
        }
    } */
}