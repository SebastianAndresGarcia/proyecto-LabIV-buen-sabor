import { Schema, model } from "mongoose";

const MercadoPagoDatosSchema = new Schema({

    identificadorPago: {
        type: Number,
        required: true,
        unique: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaAprobacion: {
        type: Date,
        default: new Date()
    },
    formaPago: {
        type: String
    },
    metodoPago: {
        type: String
    },
    nroTarjeta: {
        type: String
    },
    estado: {
        type: String
    },
    pedidoid: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }

})

export default model("MercadoPagoDatos", MercadoPagoDatosSchema);