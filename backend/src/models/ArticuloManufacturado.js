const mongoose = require("mongoose");
const RubroGeneral = require ( './RubroGeneral');

const ArticuloManufacturado = mongoose.model(
    "ArticuloManufacturado",
    new mongoose.Schema({
    
    tiempoEstimadoCocina: { //en minutos
        type: Number,
        default: null
    },    
    denominación: {
        type: String,
        default:null
    },
    precioVenta: {
        type: Number,
        default: null
    },
    imagen: {
        type: String,
        default: null
    },
    activo: { //true or false
        type: Boolean,
        default: null
    },
    detallefacturaid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DetalleFactura'
    }],
    detallepedidoid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DetallePedido'
    }],
    detallearticulomanufacturadoid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DetalleArticuloManufacturado',
        required: true
    }],
    RubroGeneral: 
    {
        type: RubroGeneral.schema,
        ref: 'RubroGeneral'  
    }

}))

exports.module= ArticuloManufacturado