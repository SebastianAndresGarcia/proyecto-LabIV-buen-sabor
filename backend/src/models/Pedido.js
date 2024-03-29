const mongoose = require("mongoose");
const Pedido = mongoose.model(
    "Pedido",
    new mongoose.Schema({

        fecha: {
            type: Date,
            default: new Date()
        },
        numero: {
            type: Number,
            default: 0
        },
        estado: {
            type: String,
            default: null
        },
        horaEstimadaFin: {
            type: Date,
            default: new Date()
        },
        tipoEnvio: {
            type: String
        },
        total: {
            type: Number,
            default: null
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        domicilioid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        },
        facturaid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Factura'
        },
        detallepedidoid: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DetallePedido',
            required: true
        }],
        mercadopagodatosid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MercadoPagoDatos'
        }
    }, {
        timestamps: true  //va a crear los campos createdAt y updatedAt
    }))

module.exports = Pedido