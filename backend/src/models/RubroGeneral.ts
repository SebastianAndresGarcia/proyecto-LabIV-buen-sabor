import { Schema, model } from "mongoose";

const RubroGeneralSchema = new Schema({
    denominacion: {
        type: String,
        required: true,
        unique: true,
        default: null
    },
    articulomanufacturadoid: [{
        type: Schema.Types.ObjectId,
        ref: 'ArticuloManufacturado'
    }]

})

export default model("RubroGeneral", RubroGeneralSchema);