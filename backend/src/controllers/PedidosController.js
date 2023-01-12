const Pedido = require('../models/Pedido');
const DetallePedido = require('../models/DetallePedido');
const ArticuloInsumo = require('../models/ArticuloInsumo');
const ArticuloManufacturado = require('../models/ArticuloManufacturado')

exports.createPedido = async (req, res) => {
    const pedido = new Pedido({
        fecha: req.body.fecha,
        numero: req.body.numero,
        estado: req.body.estado,
        horaEstimadaFin: req.body.horaEstimadaFin,
        tipoEnvio: req.body.tipoEnvio,
        total: req.body.total,
        userid: req.body.userid,
        //domicilioid: req.body.domicilioid
    })
    const detalles = []
    const detallesJson = req.body.detallepedido
    const keys = Object.keys(detallesJson);
    for (let x = 0; x < keys.length; x++) {
        detalles.push(detallesJson[keys[x]]);
    }
    console.log("detalles", detalles)

    try {
        let tipoArticulo = ""
        const savedPedido = await pedido.save()
        for (let i = 0; i < detalles.length; i++) {
            console.log("entró al for " + detalles[i].articuloid)
            const ArticuloFound = await ArticuloManufacturado.findOne({ _id: detalles[i].articuloid })
            if (ArticuloFound) { tipoArticulo = "articulomanufacturadoid" }
            else { tipoArticulo = "articuloinsumoid" }
            console.log("tipoArticulo"+tipoArticulo)
            const detallepedido = new DetallePedido({ "cantidad": detalles[i].cantidad, "subtotal": detalles[i].subtotal, [tipoArticulo]: detalles[i].articuloid, "pedidoid": savedPedido._id })
            const savedDetalle = await detallepedido.save()
            console.log("savedDetalle", savedDetalle)
            const updateManufacturado = await ArticuloManufacturado.findByIdAndUpdate(detalles[i].articuloid, { $addToSet: { "detallepedidoid": savedDetalle._id } })
            const updateInsumo = await ArticuloInsumo.findByIdAndUpdate(detalles[i].articuloid, { $addToSet: { "detallepedidoid": savedDetalle._id } })
            const updatePedido = await Pedido.findByIdAndUpdate(savedPedido._id, { $addToSet: { "detallepedidoid": savedDetalle._id } })
        }
        res.json(savedPedido)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

exports.getPedidos = async (req, res) => {
    const pedidos = await Pedido.find().populate({
        path: "detallepedidoid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1 }, //elijo solo los campos que quiero traer
        }
    })
    .populate({
        path: "detallepedidoid", // populate blogs
        populate: {
            path: "articuloinsumoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1 }, //elijo solo los campos que quiero traer
        }
    })
    if (!pedidos)
        return res.status(204).json();
    console.log(pedidos);
    return res.json(pedidos)
}
