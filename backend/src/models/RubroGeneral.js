const mongoose = require("mongoose");

const RubroGeneral = mongoose.model(
    "RubroGeneral",
    new mongoose.Schema({
    denominacion: {
        type: String,
        required: true,
        unique: true,
        default: null
    },
    articulomanufacturadoid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticuloManufacturado'
    }]

}));

module.exports =RubroGeneral;