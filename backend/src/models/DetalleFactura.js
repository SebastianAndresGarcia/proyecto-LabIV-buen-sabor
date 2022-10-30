const mongoose = require("mongoose");

const DetalleFactura = mongoose.model(
    "DetalleFactura",
    new mongoose.Schema({   
    cantidad: {
        type: Number,
        default: null
    },
    
    subtotal: {
        type: Number,
        default:null
    },
    
    articuloinsumoid: {
        type: Schema.Types.ObjectId,
        ref: 'ArticuloInsumo'
    },
    articulomanufacturadoid: {
        type: Schema.Types.ObjectId,
        ref: 'ArticuloManufacturado'
    },
    facturaid: {
        type:Schema.Types.ObjectId,
        ref: 'Factura'
    }

}))

module.exports=DetalleFactura;