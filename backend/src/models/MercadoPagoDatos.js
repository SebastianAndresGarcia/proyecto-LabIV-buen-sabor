const mongoose = require("mongoose");
const MercadoPagoDatos = mongoose.model(
    "MercadoPagoDatos",
    new mongoose.Schema({

    identificadorPago: {
        type: Number,
        required: true,
        unique: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaAprobacion: {
        type: Date,
        default: new Date()
    },
    formaPago: {
        type: String
    },
    metodoPago: {
        type: String
    },
    nroTarjeta: {
        type: String
    },
    estado: {
        type: String
    },
    pedidoid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }

}));

module.exports=MercadoPagoDatos