const mongoose = require("mongoose");
const DetalleArticuloManufacturado = require ( './DetalleArticuloManufacturado');

const ArticuloManufacturado = mongoose.model(
    "ArticuloManufacturado",
    new mongoose.Schema({
    
    tiempoEstimadoCocina: { //en minutos
        type: Number,
        default: null
    },    
    denominacion: {
        type: String,
        default:null,
        unique: true
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
    descuento: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        required: false,
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
        ref: 'DetalleArticuloManufacturado'
       // required: true
    }], 
    rubrogeneralid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RubroGeneral'
    }
    

}))

module.exports = ArticuloManufacturado