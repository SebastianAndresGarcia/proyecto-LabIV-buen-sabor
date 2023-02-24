const ArticuloManufacturado = require('../models/ArticuloManufacturado');


exports.manufacturadosVendidos = async (req, res) => {
// suponiendo que req.body.fechaBusqueda contiene '2019/03/26'
const fechaInicial = req.body.fechaBusqueda;
const fechaFinal = '2023/02/17' //fechaInicial.substring(0,8).concat(Number(fechaInicial.substring(8)) + 1);

const manufacturados = ArticuloManufacturado.find({$and: [{fecha: {$gte: new Date(fechaInicial)}},{fecha: {$lt: new Date(fechaFinal)}}]});
res.json(manufacturados)
}