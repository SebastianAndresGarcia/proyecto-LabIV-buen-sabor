import { Router } from "express";
import { createUser, getUsers, getUser, updateUser} from "./controller/UserController";
import { createAddress, getAddressbyuser } from "./controller/AddressController";
import { createRubroArticulo, agregarSubRubro, agregarArticuloRubro } from "./controller/RubroArticuloController";

const router = Router();

router.get('/test', (requ,resp) => resp.send("HOLA MUNDO"));
router.post('/crearUsuario', createUser); //acá hago un insert, entonces uso post
router.get('/usuarios', getUsers);
router.get('/usuario/:id',getUser); //ese ":id" debo recuperarlo en el controlador con un req.param.id
router.put('/actualizarUsuario/:id', updateUser);
router.post('/crearDomicilio', createAddress);
router.get('/usuarioDlios/:id', getAddressbyuser);
router.post('/crearRubro', createRubroArticulo);
router.post('/agregarSubRubro', agregarSubRubro);
router.post('/agregarArticuloRubro', agregarArticuloRubro);
/*router.post('/crearInstrumento', crearInstrumento); //acá hago un insert, entonces uso post
router.put('/actualizarInstrumento/:id', actualizarInstrumento);
router.delete('/eliminarInstrumento/:id', eliminarInstrumento);*/

export default router;
