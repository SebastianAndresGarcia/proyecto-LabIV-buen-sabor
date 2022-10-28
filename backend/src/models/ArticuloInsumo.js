const mongoose = require("mongoose");
const RubroArticulo =require("./RubroArticulo");

const ArticuloInsumo = mongoose.model(
    "ArticuloInsumo",
    new mongoose.Schema({

    denominación: {
        type: String,
        default:null,
        required: true,
        unique: true
    },
    precioCompra: {
        type: Number,
        required: true,
        default: null
    },
    precioVenta: {
        type: Number,
        required: true,
        default: null
    },
    stockActual: {
        type: Number,
        required: true,
        default: null
    },
    stockMinimo: {
        type: Number,
        required: true,
        default: null
    },
    unidadMedida: {
        type: String,
        required: true,
        default: null
    },
    esInsumo: { //true or false
        type: Boolean,
        required: true,
        default: null
    },
    detallefacturaid: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleFactura'
    }],
    detallepedidoid: [{
        type: Schema.Types.ObjectId,
        ref: 'DetallePedido'
    }],
    detallearticulomanufacturadoid: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleArticuloManufacturado',
    }],
    RubroArticulo: 
    {
        type: RubroArticulo.schema,
        ref: 'RubroArticulo'  
    }

}))

exports.module=ArticuloInsumo;