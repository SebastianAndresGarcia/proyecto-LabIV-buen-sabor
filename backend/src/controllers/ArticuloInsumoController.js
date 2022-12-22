const ArticuloInsumo = require('../models/ArticuloInsumo');
const RubroArticulo = require('../models/RubroArticulo')

exports.createArticuloInsumo = async (req, res) => {
    const ArticuloFound = await ArticuloInsumo.findOne({ denominacion: req.body.denominacion })
    if (ArticuloFound)
        return res.status(301).json({ message: 'The article already exists' })
    const articulo = new ArticuloInsumo(req.body)
    console.log(articulo)
    try {
        const savedArticulo = await articulo.save()
        //const userUpdated =await User.findByIdAndUpdate(req.body.userid, {$addToSet:{"domicilios":savedAddress._id}})
        //console.log(userUpdated)
        res.json(savedArticulo)
    } catch (error) {
        console.log(error)
    }
}
exports.updateArticuloInsumo = async (req, res) => {
    const articulo = await ArticuloInsumo.findByIdAndUpdate(req.params.id, req.body)
    res.json(articulo)
}

exports.getArticulosInsumos = async (req, res) => { //trae todos los articulosinsumos

    const insumos = await ArticuloInsumo.find()
    if (!insumos)
        return res.status(204).json();
    console.log(insumos);
    return res.json(insumos)
}

exports.getArticulosInsumosxrubro = async (req, res) => {
    console.log("req.params.id" + req.params.id)
    const rubrosinsumos = await RubroArticulo.find({ "ancestors._id": req.params.id, $where: 'this.articuloinsumoid.length>0' }, { articuloinsumoid: 1 }).populate({ path: "articuloinsumoid" })
    console.log("rubro", rubrosinsumos.length)
    if (rubrosinsumos.length == 0)
    //const rubrosinsumos = await RubroArticulo.find({"ancestors._id": req.params.id, "articuloinsumoid": {$exists:true}}).populate({path: "articuloinsumoid"})
    {
        const rubrosinsumos = await RubroArticulo.find({ "_id": req.params.id, "articuloinsumoid.0": { $exists: true } }).populate({ path: "articuloinsumoid" })
        console.log("rubrosinsumos1", rubrosinsumos.length)
        try {
            return res.json(rubrosinsumos[0].articuloinsumoid)
        } catch (e) {
            console.log(e)
            return res.json(null)
        }
    }
    else {
        // const rubrosinsumos = await RubroArticulo.find({"ancestors._id": req.params.id, $where:'this.articuloinsumoid.length>0'},{articuloinsumoid:1}).populate({path: "articuloinsumoid"})
        console.log("rubrosinsumos2", rubrosinsumos)
        const articulos = []
        for (let i = 0; i < rubrosinsumos.length; i++) {
            for (let j = 0; j < rubrosinsumos[i].articuloinsumoid.length; j++) {
                articulos.push(rubrosinsumos[i].articuloinsumoid[j]);
            }
        }
        return res.json(articulos)
    }
    /*const busqueda = req.params.id;
    console.log(busqueda)
    var array = [] = busqueda.split(",")
    const insumos = await ArticuloInsumo.find({ RubroArticuloid: array});
    if (!insumos)
        return res.status(204).json();
    console.log(insumos)
    return res.json(insumos) */
}