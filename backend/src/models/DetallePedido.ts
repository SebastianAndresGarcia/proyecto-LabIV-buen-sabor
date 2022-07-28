import { Schema, model } from "mongoose";

const DetallePedidoSchema = new Schema({
   
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

})

export default model("DetallePedido", DetallePedidoSchema);