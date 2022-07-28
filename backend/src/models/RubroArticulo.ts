import { Schema, model } from "mongoose";

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
        default: null, //Un rubro raíz debe tener el campo en null
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

export default model("RubroArticulo", RubroArticuloSchema);