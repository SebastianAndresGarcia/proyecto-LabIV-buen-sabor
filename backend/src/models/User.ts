
//https://www.kindacode.com/article/node-mongoose-typescript-defining-schemas-and-models/#Overview
/* 
import { Document, Schema, model, Types } from 'mongoose';
import { Address } from './Address';

// Create the interface
export interface IUser extends Document<Types.ObjectId> {
    usuario: string;
    clave: string;
    rol: string;
    email: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    telefono: Number;
    borrado: Boolean;
    domicilios: Types.ObjectId
}

// Create the schema
const UserSchema = new Schema<IUser>({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true
    },
    rol: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        default: ""
    },
    apellido: {
        type: String,
        default: ""
    },
    fechaNacimiento: {
        type: Date,
        default: new Date()
    },
    telefono: {
        type: Number,
        default: null
    },
    borrado: {
        type: Boolean,
        default: false,
    },

    domicilios:
        [{
            type: Address.schema, //se le puede poner al final .obj también pero si se lo pongo no me crea las fechas timestamps en dlios
            ref: "Address",
            //autopopulate: true,
        }],
},
   {
       timestamps: true  //va a crear los campos createdAt y updatedAt
    }
);
// Create and export user model
export const User = model<IUser>("User", UserSchema); */


import { Schema, model } from "mongoose";
import  Address  from "./Address";

const UserSchema = new Schema({

    usuario: {
        type: String,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true
    },
    rol: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        default: ""
    },
    apellido: {
        type: String,
        default: ""
    },
    fechaNacimiento: {
        type: Date,
        default: new Date()
    },
    telefono: {
        type: Number,
        default: null
    },
    borrado: {
        type: Boolean,
        default: false,
    },

   /* domicilios: //con este atributo, lo que hacìa era incrustar el objeto completo dentro del objeto User pero en la bd no lo creaba en Addresses solo quedaba en Users
    {
        type: [Address.schema],
        // ref: 'Address'  no cambia nada a la funcionalidad, no me está creando las fechas created/updated de los array dlios

        //  of: new Schema({
        //      handle: String,
        //      Address: {
        //          type: Schema.Types.ObjectId,
        //          ref: 'Address'
        //      }
        //  }) 
    } */
    domicilios: [{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }],
    pedidos: [{
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }]
},
    {
        timestamps: true  //va a crear los campos createdAt y updatedAt
    });
export default model("User", UserSchema);
