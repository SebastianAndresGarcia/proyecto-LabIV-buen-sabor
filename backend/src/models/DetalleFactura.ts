import { Schema, model } from "mongoose";

const DetalleFacturaSchema = new Schema({
   
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

})

export default model("DetalleFactura", DetalleFacturaSchema);