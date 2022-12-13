const DetalleArticuloManufacturado = require('../models/DetalleArticuloManufacturado');
const ArticuloManufacturado = require('../models/ArticuloManufacturado');
const ArticuloInsumo = require('../models/ArticuloInsumo');

exports.deleteDetalleArticuloManufacturado = async (req, res) => {
    const DetalleFound = await DetalleArticuloManufacturado.findOne({ _id: req.params.id }) //identifico el detalle a borrar
    const updateArticuloManufacturado = await ArticuloManufacturado.findByIdAndUpdate(DetalleFound.ArticuloManufacturadoid, { $pull: { "detallearticulomanufacturadoid": DetalleFound._id } }) //borro el detalle del ArticuloManufacturado
    const updateArticuloInsumo = await ArticuloInsumo.findByIdAndUpdate(DetalleFound.ArticuloInsumoid, { $pull: { "detallearticulomanufacturadoid": DetalleFound._id } }) //borro el detalle del ArticuloManufacturado
    const deleteDetalleArticuloManufacturado = await DetalleArticuloManufacturado.deleteOne({ _id: DetalleFound._id }) //finalmente elimino el art. manufacturado
    if (!deleteDetalleArticuloManufacturado)
        return res.status(204).json();
    res.json(deleteDetalleArticuloManufacturado)
}