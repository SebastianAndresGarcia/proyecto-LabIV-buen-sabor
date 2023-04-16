const mongoose = require('mongoose');

const RubroArticuloSchema = new mongoose.Schema({
    denominacion: { type: String, index: true, unique: true },
    esInsumo: { //true or false
        type: Boolean,
        
        default: null
    },
    articuloinsumoid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticuloInsumo',
        default: null
    }],
    padre: { type: mongoose.Schema.Types.ObjectId, ref: 'RubroArticulo', default: null },
    hijos: [this],
});

module.exports = mongoose.model('RubroArticulo', RubroArticuloSchema);
