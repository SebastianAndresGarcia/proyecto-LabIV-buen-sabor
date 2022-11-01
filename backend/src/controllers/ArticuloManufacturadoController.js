const ArticuloManufacturado = require('../models/ArticuloManufacturado');
const DetalleArticuloManufacturado = require('../models/DetalleArticuloManufacturado');
const ArticuloInsumo = require('../models/ArticuloInsumo');
const RubroGeneral = require('../models/RubroGeneral');


exports.createArticuloManufacturado = async (req, res) => {

    const insumo = req.body.insumos;
    console.log(insumo);
    const producto = req.body.ArticuloManufacturado
    console.log(producto)
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