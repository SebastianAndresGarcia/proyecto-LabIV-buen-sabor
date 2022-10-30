const mongoose = require("mongoose");
const Factura = new Schema({   
    fecha: {
        type: Date,
        default: new Date()
    },
    numero: {
        type: Number,
        required: true
    },
    montoDescuento: {
        type: Number,
        default: null
    },
    formaPago: {
        type: String,
        default: null
    },
    nroTarjeta: {
        type: String
    },
    totalVenta: {
        type: Number,
        default:null
    },
    totalCosto: {
        type: Number,
        default:null
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    detallefacturaid: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleFactura',
        required: true
    }],
    pedidoid: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }
})
module.exports=Factura;

/*import { Schema, model } from "mongoose";
const FacturaSchema = new Schema({   
    fecha: {
        type: Date,
        default: new Date()
    },
    numero: {
        type: Number,
        required: true
    },
    montoDescuento: {
        type: Number,
        default: null
    },
    formaPago: {
        type: String,
        default: null
    },
    nroTarjeta: {
        type: String
    },
    totalVenta: {
        type: Number,
        default:null
    },
    totalCosto: {
        type: Number,
        default:null
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    detallefacturaid: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleFactura',
        required: true
    }],
    pedidoid: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }
})
export default model("Factura", FacturaSchema);
*/