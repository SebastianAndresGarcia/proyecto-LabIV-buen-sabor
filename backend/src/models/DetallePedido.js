const mongoose = require("mongoose");
const DetallePedido = mongoose.model(
    "DetallePedido",
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
    pedidoid: {
        type:Schema.Types.ObjectId,
        ref: 'Pedido'
    }

}));

module.exports=DetallePedido;