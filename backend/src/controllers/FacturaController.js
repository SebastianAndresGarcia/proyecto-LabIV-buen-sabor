const Factura = require('../models/Factura');
const Pedido = require('../models/Pedido');
const DetalleFactura = require('../models/DetalleFactura');
const ArticuloInsumo = require('../models/ArticuloInsumo');
const ArticuloManufacturado = require('../models/ArticuloManufacturado')

exports.createFactura = async (req, res) => {
    const ultimoFactura = await Factura.find().limit(1).sort({ $natural: -1 })
    let num=0
    console.log(req.body)
    if(ultimoFactura.length>0){
         num=ultimoFactura[0].numero
    }
    const factura = new Factura({
        fecha: req.body.fecha,
        numero: num + 1,
        montoDescuento: req.body.montoDescuento,
        formaPago: req.body.formaPago,
        nroTarjeta: req.body.nroTarjeta,
        totalVenta: req.body.totalVenta,
        totalCosto: req.body.totalCosto,
        pedidoid: req.body.pedidoid
    })
    const detalles = []
    const detallesJson = req.body.detallefacturaid
    const keys = Object.keys(detallesJson);
    for (let x = 0; x < keys.length; x++) {
        detalles.push(detallesJson[keys[x]]);
    }
    console.log(detalles)
    try {
        let tipoArticulo = ""
        let articuloid= ""
        const savedFactura = await factura.save()
        const updatePedido = await Pedido.findByIdAndUpdate(savedFactura.pedidoid, {facturaid: savedFactura._id})
        for (let i = 0; i < detalles.length; i++) {
            console.log("entró al for " + detalles[i])
            //const ArticuloFound = await ArticuloManufacturado.findOne({ _id: detalles[i].articulomanufacturadoid._id })
            if (detalles[i].articulomanufacturadoid) 
                { tipoArticulo = "articulomanufacturadoid"
                articuloid=detalles[i].articulomanufacturadoid._id }
            else 
                { tipoArticulo = "articuloinsumoid" 
                articuloid=detalles[i].articuloinsumoid._id}
            console.log("tipoArticulo" + tipoArticulo)
            const detalleFactura = new DetalleFactura({ "cantidad": detalles[i].cantidad, "subtotal": detalles[i].subtotal, [tipoArticulo]: articuloid, "facturaid": savedFactura._id })
            const savedDetalle = await detalleFactura.save()
            console.log("savedDetalle", savedDetalle)
            const updateManufacturado = await ArticuloManufacturado.findByIdAndUpdate(articuloid, { $addToSet: { "detallefacturaid": savedDetalle._id } })
            const updateInsumo = await ArticuloInsumo.findByIdAndUpdate(articuloid, { $addToSet: { "detallefacturaid": savedDetalle._id } })
            const updateFactura = await Factura.findByIdAndUpdate(savedFactura._id, { $addToSet: { "detallefacturaid": savedDetalle._id } })
        }
        res.json(savedFactura)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

exports.getFacturas = async (req, res) => {
    const facturas = await Factura.find().populate({
        path: "detallefacturaid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, imagen: 1 }, //elijo solo los campos que quiero traer
        }
    })
        .populate({
            path: "detallefacturaid", // populate blogs
            populate: {
                path: "articuloinsumoid", // in blogs, populate comments
                select: { denominacion: 1, _id: 1, precioCompra: 1 , imagen: 1}, //elijo solo los campos que quiero traer
            }
        })
    if (!facturas)
        return res.status(204).json();
    return res.json(facturas)
}

exports.getFacturasxid = async (req, res) => {
    const id = req.params.id
    const facturas = await Factura.find({'_id':id}).populate({
        path: "detallepedidoid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, precioVenta:1 }, //elijo solo los campos que quiero traer
        }
    })
        .populate({
            path: "detallepedidoid", // populate blogs
            populate: {
                path: "articuloinsumoid", // in blogs, populate comments
                select: { denominacion: 1, _id: 1, precioCompra: 1, precioVenta:1 }, //elijo solo los campos que quiero traer
            }
        })
    if (!facturas)
        return res.status(204).json();
    return res.json(facturas)
}

exports.actualizarFactura = async (req, res) => {
    const updatefactura = await Factura.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatefactura)
}


exports.Facturaxid = async (req, res) => {
    const id = req.params.id
    const pedidos = await Factura.findById({_id:id}).populate({
        path: "detallefacturaid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, precioVenta:1 }, //elijo solo los campos que quiero traer
        }
    })
        .populate({
            path: "detallefacturaid", // populate blogs
            populate: {
                path: "articuloinsumoid", // in blogs, populate comments
                select: { denominacion: 1, _id: 1, precioCompra: 1, precioVenta:1 }, //elijo solo los campos que quiero traer
            }
        })
    if (!pedidos)
        return res.status(204).json();
    //console.log(pedidos);
    return res.json(pedidos)
}

exports.FacturaXpedidoid = async (req, res) => {
    const id = req.params.id
    const pedidos = await Factura.findOne({pedidoid: id}).populate({
        path: "detallefacturaid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, precioVenta:1 }, //elijo solo los campos que quiero traer
        }
    })
        .populate({
            path: "detallefacturaid", // populate blogs
            populate: {
                path: "articuloinsumoid", // in blogs, populate comments
                select: { denominacion: 1, _id: 1, precioCompra: 1, precioVenta:1 }, //elijo solo los campos que quiero traer
            }
        })
    if (!pedidos)
        return res.status(204).json();
    //console.log(pedidos);
    return res.json(pedidos)
}
