const ArticuloInsumo = require('../models/ArticuloInsumo');


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

exports.getArticulosInsumos = async (req, res) => {
    const insumos = await ArticuloInsumo.find()
    if (!insumos)
        return res.status(204).json();
    console.log(insumos);
    return res.json(insumos)
}

exports.getArticulosInsumosxrubro = async (req, res) => {
    const busqueda = req.params.id;
    console.log(busqueda)
    var array = [] = busqueda.split(",")
    const insumos = await ArticuloInsumo.find({ RubroArticuloid: array});
    if (!insumos)
        return res.status(204).json();
    console.log(insumos)
    return res.json(insumos)
}