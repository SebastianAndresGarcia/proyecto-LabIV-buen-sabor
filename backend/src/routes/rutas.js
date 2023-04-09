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
const controllerFacturas = require ('../controllers/FacturaController')
const controllerEstadisticas = require ('../controllers/EstadisticasController')
const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const controllerGoogleLogin = require('../controllers/googleLoginController')

router.post(
    "/api/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);
router.post("/api/auth/signin", controller.signin);
router.post('/googlelogin', controllerGoogleLogin.googleLogin)

router.get("/api/test/user", [authJwt.verifyToken], controllerUser.userBoard);
router.post('/crearDomicilio', controllerDlio.createAddress)
router.get('/usuarioDlios/:id', controllerDlio.getAddressbyuser);

router.post('/crearRubroArticulo',[authJwt.verifyToken], controllerRubroArticulo.createRubroArticulo);
router.get('/verAncestrosRubroArticulo', controllerRubroArticulo.getAncestorsRubroArticulo);
router.get('/verDescendentesRubroArticulo', controllerRubroArticulo.getDescendentsRubroArticulo);
router.post('/actualizarRubroArticulo', controllerRubroArticulo.updateRubroArticulo);
router.post('/agregarSubRubro', controllerRubroArticulo.agregarSubRubro);
router.get('/rubrosInsumos', controllerRubroArticulo.getRubrosFalseInsumos);
router.get('/rubros', controllerRubroArticulo.getRubros);

router.post('/ActualizarRubroGeneral', controllerRubroGeneral.updateRubroGeneral);
router.post('/crearRubroGeneral', controllerRubroGeneral.createRubroGeneral);
router.get('/rubrosgeneral', controllerRubroGeneral.getRubrosGeneral);

router.post('/crearArticuloManufacturado', controllerArticuloManufacturado.createArticuloManufacturado);
router.get('/articulosmanufacturados', controllerArticuloManufacturado.getArticulosManufacturados);
router.get('/articulosmanufacturadosInsumos', controllerArticuloManufacturado.getArticulosManufacturadosInsumos);
router.get('/getPromociones',/*public content*/ controllerArticuloManufacturado.getPromociones);
router.get('/articulosmanufacturadosxrubro/:id', controllerArticuloManufacturado.getArticulosManufacturadosxrubro);
router.post('/actualizarArticuloManufacturado/:id', controllerArticuloManufacturado.updateArticuloManufacturado);
router.get('/getManufacturadoXdenominacion/:id', controllerArticuloManufacturado.getManufacturadoXdenominacion);
router.get('/getManufacturadoXid/:id', controllerArticuloManufacturado.getManufacturadoXid);
router.get('/articulosmanufacturadosInsumos', controllerArticuloManufacturado.getArticulosManufacturadosInsumos);
router.delete('/eliminarArticuloManufacturado/:id', controllerArticuloManufacturado.deleteArticuloManufacturado);

router.delete('/eliminarDetalleArticuloManufacturado/:id', controllerDetalleArticuloManufacturado.deleteDetalleArticuloManufacturado);

router.post('/crearArticuloInsumo', controllerArticuloInsumo.createArticuloInsumo)
router.get('/ArticuloInsumo/:id', controllerArticuloInsumo.getArticuloInsumo)
router.get('/ArticuloInsumoxid/:id', controllerArticuloInsumo.getArticuloInsumoxid)
router.get('/ArticulosInsumos', controllerArticuloInsumo.getArticulosInsumos)
router.get('/articulosinsumosXrubro/:id', controllerArticuloInsumo.getArticulosInsumosxrubro)
router.get('/insumosXrubro/:id', controllerArticuloInsumo.getArticulosInsumosFalsexRubro)
router.get('/articulosinsumosfalse', controllerArticuloInsumo.getArticulosInsumosFalse)
router.post('/ActualizarInsumo/:id', controllerArticuloInsumo.updateArticuloInsumo)
router.post('/ActualizarInsumoxid/:id', controllerArticuloInsumo.updateArticuloInsumoxid)
router.delete('/EliminarInsumo/:id', controllerArticuloInsumo.deleteArticuloInsumo)

router.get('/empleados', controllerUser.getEmpleados)
router.post('/ActualizarUsuario', controllerUser.updateUser)

router.get('/Roles', controllerRoles.getRoles)

router.post('/crearPedido', controllerPedidos.createPedido)
router.get('/Pedidos',[authJwt.verifyToken], controllerPedidos.getPedidos)
router.get('/pedidosxid/:id',[authJwt.verifyToken], controllerPedidos.getPedidosxid) //todos los pedidos de un usuario
router.get('/pedidoxid/:id', controllerPedidos.Pedidoxid) //un pedido por su id
router.post('/actualizarPedido/:id', controllerPedidos.actualizarPedido)
router.get('/pedidoscocinero', controllerPedidos.getPedidosCocinero)

router.post("/checkout", controllerMercaPago.checkout)
router.post("/registrarPago", controllerMercaPago.savePayment)

router.post('/crearFactura', controllerFacturas.createFactura)
router.get('/Facturas', controllerFacturas.getFacturas)
router.get('/facturasxid/:id', controllerFacturas.getFacturasxid)
router.get('/facturaxid/:id', controllerFacturas.Facturaxid)
router.get('/FacturaXpedidoid/:id', controllerFacturas.FacturaXpedidoid)
router.post('/actualizarFactura/:id', controllerFacturas.actualizarFactura)

router.get('/manufacturadosVendidos/:fechaDesde/:fechaHasta', controllerEstadisticas.manufacturadosVendidos)
router.get('/pedidosXcliente/:fechaDesde/:fechaHasta', controllerEstadisticas.pedidosXcliente)
router.get('/ganancias/:fechaDesde/:fechaHasta', controllerEstadisticas.ganancias)
router.get('/recaudaciones/:fechaDesde/:fechaHasta', controllerEstadisticas.recaudaciones)

module.exports = router