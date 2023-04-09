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
router.post('/crearDomicilio', [authJwt.verifyToken],controllerDlio.createAddress)
router.get('/usuarioDlios/:id',[authJwt.verifyToken], controllerDlio.getAddressbyuser);

router.post('/crearRubroArticulo',[authJwt.verifyToken], controllerRubroArticulo.createRubroArticulo);
router.get('/verAncestrosRubroArticulo',[authJwt.verifyToken], controllerRubroArticulo.getAncestorsRubroArticulo);
router.get('/verDescendentesRubroArticulo',[authJwt.verifyToken], controllerRubroArticulo.getDescendentsRubroArticulo);
router.post('/actualizarRubroArticulo',[authJwt.verifyToken], controllerRubroArticulo.updateRubroArticulo);
router.post('/agregarSubRubro',[authJwt.verifyToken], controllerRubroArticulo.agregarSubRubro);
router.get('/rubrosInsumos', controllerRubroArticulo.getRubrosFalseInsumos);
router.get('/rubros',[authJwt.verifyToken], controllerRubroArticulo.getRubros);

router.post('/ActualizarRubroGeneral',[authJwt.verifyToken], controllerRubroGeneral.updateRubroGeneral);
router.post('/crearRubroGeneral',[authJwt.verifyToken], controllerRubroGeneral.createRubroGeneral);
router.get('/rubrosgeneral', controllerRubroGeneral.getRubrosGeneral);

router.post('/crearArticuloManufacturado',[authJwt.verifyToken], controllerArticuloManufacturado.createArticuloManufacturado);
router.get('/articulosmanufacturados', controllerArticuloManufacturado.getArticulosManufacturados);
router.get('/articulosmanufacturadosInsumos', controllerArticuloManufacturado.getArticulosManufacturadosInsumos);
router.get('/getPromociones',/*public content*/ controllerArticuloManufacturado.getPromociones);
router.get('/articulosmanufacturadosxrubro/:id', controllerArticuloManufacturado.getArticulosManufacturadosxrubro);
router.post('/actualizarArticuloManufacturado/:id',[authJwt.verifyToken], controllerArticuloManufacturado.updateArticuloManufacturado);
router.get('/getManufacturadoXdenominacion/:id', controllerArticuloManufacturado.getManufacturadoXdenominacion);
router.get('/getManufacturadoXid/:id', controllerArticuloManufacturado.getManufacturadoXid);
router.get('/articulosmanufacturadosInsumos', controllerArticuloManufacturado.getArticulosManufacturadosInsumos);
router.delete('/eliminarArticuloManufacturado/:id',[authJwt.verifyToken], controllerArticuloManufacturado.deleteArticuloManufacturado);

router.delete('/eliminarDetalleArticuloManufacturado/:id',[authJwt.verifyToken], controllerDetalleArticuloManufacturado.deleteDetalleArticuloManufacturado);

router.post('/crearArticuloInsumo',[authJwt.verifyToken], controllerArticuloInsumo.createArticuloInsumo)
router.get('/ArticuloInsumo/:id', controllerArticuloInsumo.getArticuloInsumo)
router.get('/ArticuloInsumoxid/:id', controllerArticuloInsumo.getArticuloInsumoxid)
router.get('/ArticulosInsumos', controllerArticuloInsumo.getArticulosInsumos)
router.get('/articulosinsumosXrubro/:id', controllerArticuloInsumo.getArticulosInsumosxrubro)
router.get('/insumosXrubro/:id', controllerArticuloInsumo.getArticulosInsumosFalsexRubro)
router.get('/articulosinsumosfalse', controllerArticuloInsumo.getArticulosInsumosFalse)
router.post('/ActualizarInsumo/:id', [authJwt.verifyToken], controllerArticuloInsumo.updateArticuloInsumo)
router.post('/ActualizarInsumoxid/:id',[authJwt.verifyToken], controllerArticuloInsumo.updateArticuloInsumoxid)
router.delete('/EliminarInsumo/:id',[authJwt.verifyToken], controllerArticuloInsumo.deleteArticuloInsumo)

router.get('/empleados',[authJwt.verifyToken], controllerUser.getEmpleados)
router.post('/ActualizarUsuario',[authJwt.verifyToken], controllerUser.updateUser)

router.get('/Roles', controllerRoles.getRoles)

router.post('/crearPedido',[authJwt.verifyToken], controllerPedidos.createPedido)
router.get('/Pedidos',[authJwt.verifyToken], controllerPedidos.getPedidos)
router.get('/pedidosxid/:id',[authJwt.verifyToken], controllerPedidos.getPedidosxid) //todos los pedidos de un usuario
router.get('/pedidoxid/:id', [authJwt.verifyToken], controllerPedidos.Pedidoxid) //un pedido por su id
router.post('/actualizarPedido/:id', [authJwt.verifyToken], controllerPedidos.actualizarPedido)
router.get('/pedidoscocinero', [authJwt.verifyToken], controllerPedidos.getPedidosCocinero)

router.post("/checkout",[authJwt.verifyToken], controllerMercaPago.checkout)
router.post("/registrarPago",[authJwt.verifyToken], controllerMercaPago.savePayment)

router.post('/crearFactura',[authJwt.verifyToken], controllerFacturas.createFactura)
router.get('/Facturas', [authJwt.verifyToken],controllerFacturas.getFacturas)
router.get('/facturasxid/:id',[authJwt.verifyToken], controllerFacturas.getFacturasxid)
router.get('/facturaxid/:id',[authJwt.verifyToken], controllerFacturas.Facturaxid)
router.get('/FacturaXpedidoid/:id',[authJwt.verifyToken], controllerFacturas.FacturaXpedidoid)
router.post('/actualizarFactura/:id',[authJwt.verifyToken], controllerFacturas.actualizarFactura)

router.get('/manufacturadosVendidos/:fechaDesde/:fechaHasta',[authJwt.verifyToken], controllerEstadisticas.manufacturadosVendidos)
router.get('/pedidosXcliente/:fechaDesde/:fechaHasta',[authJwt.verifyToken], controllerEstadisticas.pedidosXcliente)
router.get('/ganancias/:fechaDesde/:fechaHasta',[authJwt.verifyToken], controllerEstadisticas.ganancias)
router.get('/recaudaciones/:fechaDesde/:fechaHasta',[authJwt.verifyToken], controllerEstadisticas.recaudaciones)

module.exports = router