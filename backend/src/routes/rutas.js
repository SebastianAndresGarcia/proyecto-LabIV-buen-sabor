const express = require('express');
const router = express.Router();
const controllerDlio = require('../controllers/AddressController')
const controllerRubroArticulo = require('../controllers/RubroArticuloController')
const controllerRubroGeneral = require('../controllers/RubroGeneralController')
const controllerArticuloManufacturado = require('../controllers/ArticuloManufacturadoController')
const controllerArticuloInsumo = require('../controllers/ArticuloInsumoController')
const controllerDetalleArticuloManufacturado = require('../controllers/DetalleArticuloManufacturadoController')

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

router.get('/test', (requ, resp) => resp.send("HOLA MUNDO"));
router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
router.post(
    "/api/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);
router.post("/api/auth/signin", controller.signin);


router.post('/crearDomicilio', controllerDlio.createAddress)
router.get('/usuarioDlios/:id', controllerDlio.getAddressbyuser);
router.post('/crearRubroArticulo', controllerRubroArticulo.createRubroArticulo);
router.post('/ActualizarRubroGeneral', controllerRubroGeneral.updateRubroGeneral);
router.get('/rubros/', controllerRubroArticulo.getRubros);
router.post('/agregarSubRubro', controllerRubroArticulo.agregarSubRubro);
// router.post('/agregarArticuloRubro', agregarArticuloRubro);  //comentar-descomentar ctrol+k+c  ctrl+k+u
router.post('/crearRubroGeneral', controllerRubroGeneral.createRubroGeneral);
router.get('/rubrosgeneral', controllerRubroGeneral.getRubrosGeneral);
router.post('/crearArticuloManufacturado', controllerArticuloManufacturado.createArticuloManufacturado);
router.get('/articulosmanufacturados', controllerArticuloManufacturado.getArticulosManufacturados);
router.get('/articulosmanufacturadosxrubro/:id', controllerArticuloManufacturado.getArticulosManufacturadosxrubro); 
router.post('/actualizarArticuloManufacturado/:id', controllerArticuloManufacturado.updateArticuloManufacturado);
router.get('/getManufacturadoXdenominacion/:id', controllerArticuloManufacturado.getManufacturadoXdenominacion);
router.delete('/eliminarArticuloManufacturado/:id', controllerArticuloManufacturado.deleteArticuloManufacturado);
router.delete('/eliminarDetalleArticuloManufacturado/:id', controllerDetalleArticuloManufacturado.deleteDetalleArticuloManufacturado);
router.post('/crearArticuloInsumo', controllerArticuloInsumo.createArticuloInsumo)
router.get('/ArticulosInsumos', controllerArticuloInsumo.getArticulosInsumos)
router.get('/ArticulosInsumosxrubro/:id', controllerArticuloInsumo.getArticulosInsumosxrubro)
router.post('/ActualizarInsumo/:id', controllerArticuloInsumo.updateArticuloInsumo)

module.exports = router