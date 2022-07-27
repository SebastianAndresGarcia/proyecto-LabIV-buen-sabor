/*
import { Document, Schema, Types, model } from 'mongoose';

export interface IPedidos extends Document {
    fecha: Date,
    numero: Number,
    estado: String,
    horaEstimadaFin: Date,
    tipoEnvio: String,
    total: Number,
    user: Types.ObjectId
}

const PedidosSchema = new Schema<IPedidos>({
    fecha: { 
        type: Date, 
        default: Date.now },
    numero: {
        type: Number,
        default: null
    },
    estado: {
        type: String,
        default: null
    },
    horaEstimadaFin: {
        type: Date
    },
    tipoEnvio: {
        type: String

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})

// create and export post model
export const AddressModel = model<IPedidos>("Pedidos", PedidosSchema); 
*/
import { Schema, model } from "mongoose";


const PedidosSchema = new Schema({
    fecha: {
        type: Date,
        default: new Date()
    },
    numero: {
        type: Number,
        default: null
    },
    estado: {
        type: String,
        default: null
    },
    horaEstimadaFin: {
        type: Date,
        default: new Date()
    },
    tipoEnvio: {
        type: String
    },
    total: {
        type: Number,
        default:null
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default model("Pedidos", PedidosSchema);