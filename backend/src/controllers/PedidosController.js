const Pedido = require('../models/Pedido');
const User = require('../models/user.model');
const DetallePedido = require('../models/DetallePedido');
const ArticuloInsumo = require('../models/ArticuloInsumo');
const ArticuloManufacturado = require('../models/ArticuloManufacturado')


exports.createPedido = async (req, res) => {
    const ultimoPedido = await Pedido.find().limit(1).sort({ $natural: -1 })
    let num = 0
    if (ultimoPedido.length > 0) {
        num = ultimoPedido[0].numero
    }
    const pedido = new Pedido({
        fecha: req.body.fecha,
        numero: num + 1,
        estado: req.body.estado,
        horaEstimadaFin: req.body.horaEstimadaFin,
        tipoEnvio: req.body.tipoEnvio,
        total: req.body.total,
        userid: req.body.userid
        //domicilioid: req.body.domicilioid
    })
    const detalles = []
    const detallesJson = req.body.detallepedido
    const keys = Object.keys(detallesJson);
    for (let x = 0; x < keys.length; x++) {
        detalles.push(detallesJson[keys[x]]);
    }
    try {
        let tipoArticulo = ""
        const savedPedido = await pedido.save()
        const updateUser = await User.findByIdAndUpdate(savedPedido.userid, { $addToSet: { "pedidosid": savedPedido._id } })
        for (let i = 0; i < detalles.length; i++) {
            console.log("entró al for " + detalles[i].articuloid)
            const ArticuloFound = await ArticuloManufacturado.findOne({ _id: detalles[i].articuloid })
            if (ArticuloFound) 
                { tipoArticulo = "articulomanufacturadoid" }
            else 
                { tipoArticulo = "articuloinsumoid" }
            console.log("tipoArticulo" + tipoArticulo)
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
        path: "detallepedidoid", 
        populate: {
            path: "articulomanufacturadoid", 
            select: { denominacion: 1, _id: 1, imagen: 1 }, //elijo solo los campos que quiero traer
        }
        })  //acá hay dos populate con path iguales, xq depende si en la bd va a haber un manufact o un insumo
        .populate({
            path: "detallepedidoid", 
            populate: {
                path: "articuloinsumoid", 
                select: { denominacion: 1, _id: 1 }, //elijo solo los campos que quiero traer
            }
        })
        .populate({
            path: "mercadopagodatosid",
            select: { estado: 1 }
        })
            
        if (!pedidos)
            return res.status(204).json();
        //console.log(pedidos);
        return res.json(pedidos)
}

exports.getPedidosxid = async (req, res) => {
    const id = req.params.id
    const pedidos = await Pedido.find({ 'userid': id }).populate({
        path: "detallepedidoid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, imagen: 1, precioVenta: 1 }, //elijo solo los campos que quiero traer
        }
    })
        .populate({
            path: "detallepedidoid", // populate blogs
            populate: {
                path: "articuloinsumoid", // in blogs, populate comments
                select: { denominacion: 1, _id: 1 }, //elijo solo los campos que quiero traer
            }
        })
        .populate({
            path: "mercadopagodatosid", // populate blogs
            select: { estado: 1, _id: 1 }, //elijo solo los campos que quiero traer

        })
    if (!pedidos)
        return res.status(204).json();
    //console.log(pedidos);
    return res.json(pedidos)
}
exports.getPedidosCocinero = async (req, res) => {
    const estado = "elaboracion"
    const pedidos = await Pedido.find({ 'estado': estado }).populate({
        path: "detallepedidoid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, imagen: 1 }, //elijo solo los campos que quiero traer
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
    //console.log(pedidos);
    return res.json(pedidos)
}

exports.actualizarPedido = async (req, res) => {
    const updatepedido = await Pedido.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatepedido)
}

exports.Pedidoxid = async (req, res) => {
    const id = req.params.id
    const pedidos = await Pedido.findById({ _id: id }).populate({
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
        }).populate({
            path: "mercadopagodatosid",
            //select: {formaPago: 1 , nroTarjeta: 1}
        })
    if (!pedidos)
        return res.status(204).json();
    //console.log(pedidos);
    return res.json(pedidos)
}
