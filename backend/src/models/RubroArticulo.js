//https://medium.com/swlh/crud-operations-on-mongodb-tree-data-structure-f5afaeca1550

//https://stackoverflow.com/questions/38734051/nest-mongoose-schema-within-itself/72603609#72603609
const mongoose = require("mongoose");
const RubroArticuloSchema = mongoose.model(
    "RubroArticulo", new mongoose.Schema({
        denominacion: { type: String, index: true },
        articuloinsumoid: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ArticuloInsumo',
            default: null
        }],
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: 'RubroArticulo'
        },
        ancestors: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RubroArticulo",
                index: true
            },
            denominacion: { type: String },
        }]
    }));
module.exports = RubroArticuloSchema

/*const itemSchema = new mongoose.Schema({

    denominacion: {
        type: String,
        unique: true
    },
    items: {
        type: [this],
        default: undefined,
        //ref: 'itemSchema' // no hace nada

    },
    articuloinsumoid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticuloInsumo'
    }]
}
)

const RubroArticulo = mongoose.model(
    "RubroArticulo",

    new mongoose.Schema({

        denominacion: {
            type: String,
            unique: true
        },
        items: {
            type: [itemSchema],
            default: undefined,
            ref: 'itemSchema', //no hace nada
        },
        articuloinsumoid: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ArticuloInsumo'
        }]
    }
    ));
module.exports = RubroArticulo

/*
//https://stackoverflow.com/questions/44968248/how-to-populate-documents-with-unlimited-nested-levels-using-mongoose
const mongoose = require("mongoose");
//const ArticuloInsumo=require('./ArticuloInsumo')


const rubrochild =
    new mongoose.Schema({
    denominacionRubroHijo : {
       type: String,
       unique: true
    },
    rubropadreid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'RubroArticulo',
        required: true,
        default: null
     },
     //articulos : [Object]
 });


 const RubroArticulo = mongoose.model(
    "RubroArticulo",
    new mongoose.Schema({

    denominacion: {
        type: String,
        unique: true
    },
    Rubrohijo: [{ type: mongoose.Schema.ObjectId, ref: "RubroArticulo"}],
    //articulos: [ArticuloInsumo]

 }));
 module.exports= RubroArticulo;
/*import { Schema, model } from "mongoose";

const RubroArticuloSchema = new Schema({
    denominacion: {
        type: String,
        required: true,
        unique: true,
        default: null
    },
    rubroPadre: {
        type: Schema.Types.ObjectId,
        ref: "Rubro",
        default: null, //Un rubro ra??z debe tener el campo en null
    },
    rubroshijos: [{
        type: Schema.Types.ObjectId,
        autopopulate: true,
        ref: "Rubro"
    }],
    articuloinsumoid: [{
        type: Schema.Types.ObjectId,
        ref: 'ArticuloInsumo'
    }]
})

export default model("RubroArticulo", RubroArticuloSchema); */


//https://stackoverflow.com/questions/39231091/how-to-create-nested-object-in-mongodb-schema
/*import { Schema, model } from "mongoose";
const rubroartSchema = new Schema({
    denominacion: {
        type: String,
        unique: true
    },
    rubroData: Array
});
const SavedRubro = model('rubroart', rubroartSchema);
// });

const RubroArticuloSchema = new Schema({
    denominacion: { type: String, unique: true },
    rubrosarticulos: [rubroartSchema]

})
export default model('RubroArticulo', RubroArticuloSchema);

-------------------------------

import { Schema, model } from "mongoose";
var rubrochildSchema = new Schema({
    denominacionRubroHijo : {
       type: String,
       unique: true
    },
    rubropadreid : {
        type : Schema.Types.ObjectId,
        ref : 'RubroArticulo',
        required: true,
        default: null
     }, 
     articulos : [Object]
 });
 
 
 var RubroArticuloSchema = new Schema({  //parentSchema
     denominacionRubroPadre: { 
        type: String,
        unique: true
    },
     rubrohijo :  [rubrochildSchema],
     articulos: [Object]
    
 });
 export default model('RubroArticulo', RubroArticuloSchema);
*/