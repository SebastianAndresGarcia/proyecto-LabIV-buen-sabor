//https://medium.com/swlh/crud-operations-on-mongodb-tree-data-structure-f5afaeca1550  //recursivas

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
        const rubroArticuloUpdated = await RubroArticulo.findByIdAndUpdate(savedArticulo.RubroArticuloid, { $addToSet: { "articuloinsumoid": savedArticulo._id } })
        //console.log(userUpdated)
        res.json(savedArticulo)
    } catch (error) {
        console.log(error)
    }
}
exports.deleteArticuloInsumo = async (req, res) => {
    const ArticuloFound = await ArticuloInsumo.findOne({ _id: req.params.id }) //identifico el insumo a borrar
    const updateRubroGeneral = await RubroArticulo.findByIdAndUpdate(ArticuloFound.RubroArticuloid, { $pull: { "articuloinsumoid": ArticuloFound._id } }) //borro el insumo del array de RubroArticulo
    //tal vez debería borrar los id de los Manufacturados
    const eliminarArticulo = await ArticuloFound.deleteOne({ _id: ArticuloFound._id }) //finalmente elimino el insumo
    if (!eliminarArticulo)
        return res.status(204).json();
    res.json(eliminarArticulo)
}

exports.updateArticuloInsumo = async (req, res) => {
    console.log("req.body update ", req.body)
        const articulo = await ArticuloInsumo.findOneAndUpdate({ denominacion: req.params.id }, req.body)
        console.log("insumo actualizado stock", articulo)
        res.json(articulo)
}

exports.updateArticuloInsumoxid = async (req, res) => {
    console.log("req.body update ", req.body)
        const articulo = await ArticuloInsumo.findOneAndUpdate({ _id: req.params.id }, req.body)
        console.log("insumo actualizado stock", articulo)
        res.json(articulo)
}
exports.getArticulosInsumos = async (req, res) => { //trae todos los articulosinsumos
    const insumos = await ArticuloInsumo.find()
    if (!insumos)
        return res.status(204).json();
    console.log(insumos);
    return res.json(insumos)
}
exports.getArticuloInsumo = async (req, res) => { //trae un articulo

    const insumo = await ArticuloInsumo.findOne({ denominacion: req.params.id })
    if (!insumo)
        return res.status(204).json();
    console.log(insumo);
    return res.json(insumo)

}

exports.getArticuloInsumoxid = async (req, res) => { //trae un articulo

    const insumo = await ArticuloInsumo.findOne({ _id: req.params.id })
    if (!insumo)
        return res.status(204).json();
    console.log(insumo);
    return res.json(insumo)
}
exports.getArticulosInsumosxrubro = async (req, res) => {
    console.log("req.params.id" + req.params.id)
    const busqueda = req.params.id;
    var array = [] = busqueda.split(",")
    console.log(array)
    console.log("array.length " + array.length)
    const rubrosinsumos = await RubroArticulo.find({ $or: [{ "ancestors._id": { $in: array } }, { "_id": { $in: array } }], $where: 'this.articuloinsumoid.length>0' }, { articuloinsumoid: 1 }).populate({ path: "articuloinsumoid" })
    console.log("rubro", rubrosinsumos.length)
    // if (rubrosinsumos.length == 0)
    // //const rubrosinsumos = await RubroArticulo.find({"ancestors._id": req.params.id, "articuloinsumoid": {$exists:true}}).populate({path: "articuloinsumoid"})
    // {
    //     const rubrosinsumos = await RubroArticulo.find({ "_id":   {$in:array} , "articuloinsumoid.0": { $exists: true } }).populate({ path: "articuloinsumoid" })
    //     console.log("rubrosinsumos1", rubrosinsumos.length)
    //     try {
    //         return res.json(rubrosinsumos[0].articuloinsumoid)
    //     } catch (e) {
    //         console.log(e)
    //         return res.json(null)
    //     }
    // }
    // else {
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
exports.getArticulosInsumosFalse = async (req, res) => {
    const resultado = await ArticuloInsumo.find
        ({ "esInsumo": false }).populate(
            { path: "RubroArticuloid" }
        )
    console.log(resultado)
    return res.json(resultado)
    // const resultado=[]
    //     const rubros = await RubroArticulo.find
    //     ({}).where('articuloinsumoid').ne([]) 
    //     .populate({
    //         path: "articuloinsumoid",
    //         match: { "esInsumo": false },
    //         select: { denominacion: 1, RubroArticuloid: 1 }
    //     })
    //     for (let i = 0; i < rubros.length; i++) {
    //         if(rubros[i].articuloinsumoid.length>0)
    //             resultado.push(rubros[i].articuloinsumoid)
    //     }
    //     console.log(resultado)
    //     return res.json(resultado)
}
exports.getArticulosInsumosFalsexRubro = async (req, res) => {
    const resultado = await ArticuloInsumo.find
        ({ "RubroArticuloid": req.params.id }).populate(
            { path: "RubroArticuloid" }
        )
    console.log(resultado)
    return res.json(resultado)

}