const express = require('express');
const router = express.Router();
const controllerDlio = require('../controllers/AddressController')
const controllerRubroArticulo = require('../controllers/RubroArticuloController')
const controllerRubroGeneral = require('../controllers/RubroGeneralController')
const controllerArticuloManufacturado = require('../controllers/ArticuloManufacturadoController')
const controllerArticuloInsumo = require('../controllers/ArticuloInsumoController')

router.get('/test', (requ,resp) => resp.send("HOLA MUNDO"));

router.post('/crearDomicilio', controllerDlio.createAddress)

router.get('/usuarioDlios/:id', controllerDlio.getAddressbyuser);

router.post('/crearRubro', controllerRubroArticulo.createRubroArticulo);
router.get('/verRubros/', controllerRubroArticulo.getRubros);
router.post('/agregarSubRubro', controllerRubroArticulo.agregarSubRubro);
// router.post('/agregarArticuloRubro', agregarArticuloRubro);  //comentar-descomentar ctrol+k+c  ctrl+k+u
router.post('/crearRubroGeneral', controllerRubroGeneral.createRubroGeneral);
router.post('/crearArticuloManufacturado', controllerArticuloManufacturado.createArticuloManufacturado);
router.post('/crearArticuloInsumo',controllerArticuloInsumo.createArticuloInsumo)

module.exports = router