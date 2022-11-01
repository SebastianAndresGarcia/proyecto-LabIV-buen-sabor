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