const mongoose = require("mongoose");
const DetalleArticuloManufacturado = mongoose.model(
    "DetalleArticuloManufacturado",
    new mongoose.Schema({  
   
    cantidad: {
        type: Number,
        default: null
    },
    
    unidadMedida: {
        type: String,
        default:null
    },
    ArticuloManufacturadoid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticuloManufacturado'
    },
    ArticuloInsumoid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticuloInsumo'
    }
}));

module.exports=DetalleArticuloManufacturado;