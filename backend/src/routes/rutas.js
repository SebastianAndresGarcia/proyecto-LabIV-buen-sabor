const express = require('express');
const router = express.Router();
const controllerDlio = require('../controllers/AddressController')


router.get('/test', (requ,resp) => resp.send("HOLA MUNDO"));

router.post('/crearDomicilio', controllerDlio.createAddress)



router.get('/usuarioDlios/:id', controllerDlio.getAddressbyuser);

// router.post('/crearRubro', createRubroArticulo);
// router.post('/agregarSubRubro', agregarSubRubro);
// router.post('/agregarArticuloRubro', agregarArticuloRubro);  //comentar-descomentar ctrol+k+c  ctrl+k+u

module.exports = router