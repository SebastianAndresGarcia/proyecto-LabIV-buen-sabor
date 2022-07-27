/* 
import { Document, Schema, Types, model } from 'mongoose';
// post interface
export interface IAddress extends Document<Types.ObjectId> {
  calle: string;
  numero: Number;
  localidad: string;
  user: Types.ObjectId;
}

// post schema 
const AddressSchema = new Schema<IAddress>({
  calle: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  localidad: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true
})

export const Address = model<IAddress>("Address", AddressSchema); */


import { Schema, model } from "mongoose";
import User from "./User";

const AddressSchema = new Schema({
  calle: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  localidad: {
    type: String,
    required: true
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

export default model("Address", AddressSchema);
