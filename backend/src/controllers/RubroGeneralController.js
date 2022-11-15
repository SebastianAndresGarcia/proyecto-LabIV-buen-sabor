const RubroGeneral = require("../models/RubroGeneral");


exports.createRubroGeneral = async (req, res) =>  {
    /*const rubroFound = await Rubro.findOne({ "denominacionRubroPadre": req.body.denominacionRubroPadre })
    if (rubroFound)
        return res.status(301).json({ message: 'The rubro already exists' }) */
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