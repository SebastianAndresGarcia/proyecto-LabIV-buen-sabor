const ArticuloManufacturado = require('../models/ArticuloManufacturado');
const RubroGeneral = require('../models/RubroGeneral');


exports.createArticuloManufacturado = async (req, res) => {
    //const AddressFound = await Address.findOne({ usuario: req.body.usuario })
    //const user = await User.findById(req.body.id)
    const articulo = new ArticuloManufacturado(req.body)
    console.log(articulo)
    try {
        const savedArticulo = await articulo.save()
        const rubroGralUpdated =await RubroGeneral.findByIdAndUpdate(req.body.rubrogeneralid, {$addToSet:{"articulomanufacturadoid":savedArticulo._id}})
        console.log(savedArticulo)
        res.json(rubroGralUpdated)
        
    } catch (error) {
        console.log(error)
    }

}