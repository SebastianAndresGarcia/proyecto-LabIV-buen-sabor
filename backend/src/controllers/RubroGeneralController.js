const RubroGeneral = require("../models/RubroGeneral");


exports.createRubroGeneral = async (req, res) =>  {
    const rubroFound = await RubroGeneral.findOne({ "denominacion": req.body.denominacion })
    if (rubroFound)
        return res.status(301).json({ message: 'El rubro ya existe' }) 
    const rubro = new RubroGeneral(req.body)
    console.log(rubro)
    const savedRubro = await rubro.save()
    res.json(savedRubro)
},
exports.getRubrosGeneral = async (req, res) => {
    const rubros = await RubroGeneral.find()
    console.log(rubros)
    return res.json(rubros)
}
exports.updateRubroGeneral = async (req, res) => {
    const rubroupdated = await RubroGeneral.findAndUpdate({"denominacion": req.param.id}, req.body)
    res.json(rubroupdated)
}