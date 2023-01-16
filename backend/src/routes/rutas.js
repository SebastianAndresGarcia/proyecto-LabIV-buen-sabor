const express = require('express');
const router = express.Router();
const controllerDlio = require('../controllers/AddressController')
const controllerRubroArticulo = require('../controllers/RubroArticuloController')
const controllerRubroGeneral = require('../controllers/RubroGeneralController')
const controllerArticuloManufacturado = require('../controllers/ArticuloManufacturadoController')
const controllerArticuloInsumo = require('../controllers/ArticuloInsumoController')
const controllerDetalleArticuloManufacturado = require('../controllers/DetalleArticuloManufacturadoController')
const controllerUser = require('../controllers/user.controller')
const controllerRoles = require('../controllers/Roles.controller')
const controllerPedidos = require('../controllers/PedidosController')
const controllerMercaPago = require('../controllerMPago/MercadoPagoController')

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

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
router.get('/verAncestrosRubroArticulo', controllerRubroArticulo.getAncestorsRubroArticulo);
router.get('/verDescendentesRubroArticulo', controllerRubroArticulo.getDescendentsRubroArticulo);
router.post('/actualizarRubroArticulo', controllerRubroArticulo.updateRubroArticulo);
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
router.get('/getManufacturadoXid/:id', controllerArticuloManufacturado.getManufacturadoXid);
router.delete('/eliminarArticuloManufacturado/:id', controllerArticuloManufacturado.deleteArticuloManufacturado);
router.delete('/eliminarDetalleArticuloManufacturado/:id', controllerDetalleArticuloManufacturado.deleteDetalleArticuloManufacturado);
router.post('/crearArticuloInsumo', controllerArticuloInsumo.createArticuloInsumo)
router.get('/ArticuloInsumo/:id', controllerArticuloInsumo.getArticuloInsumo)
router.get('/ArticulosInsumos', controllerArticuloInsumo.getArticulosInsumos)
router.get('/articulosinsumosXrubro/:id', controllerArticuloInsumo.getArticulosInsumosxrubro)
router.post('/ActualizarInsumo/:id', controllerArticuloInsumo.updateArticuloInsumo)
router.delete('/EliminarInsumo/:id', controllerArticuloInsumo.deleteArticuloInsumo)
router.get('/empleados', controllerUser.getEmpleados)
router.post('/ActualizarUsuario', controllerUser.updateUser)
router.get('/Roles', controllerRoles.getRoles)
router.post('/crearPedido', controllerPedidos.createPedido)
router.get('/Pedidos', controllerPedidos.getPedidos)
router.get('/pedidosxid/:id', controllerPedidos.getPedidosxid)
router.get('/pedidoxid/:id', controllerPedidos.Pedidosxid)
router.post('/actualizarPedido/:id', controllerPedidos.actualizarPedido)
router.post("/checkout", controllerMercaPago.checkout)
router.post("/registrarPago", controllerMercaPago.savePayment)
module.exports = router