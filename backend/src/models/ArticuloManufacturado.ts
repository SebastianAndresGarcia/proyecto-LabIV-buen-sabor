import { Schema, model } from "mongoose";
import RubroGeneral from './RubroGeneral';

const ArticuloManufacturadoSchema = new Schema({
    
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
        required: true
    }],
    RubroGeneral: 
    {
        type: RubroGeneral.schema,
        ref: 'RubroGeneral'  
    }

})

export default model("ArticuloManufacturado", ArticuloManufacturadoSchema);