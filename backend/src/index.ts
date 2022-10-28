
/*import express from "express"; 
import rutas from './rutas';
import morgan from 'morgan'
import cors from 'cors'
import './database/database' 
const app = express();  //creo una instancia de express para poder levantar el servidor

app.use(express.json()); //transforma los datos de objetos a json, las consultas realizadas a la bd en el controlador las pasará a json
app.use(express.urlencoded({extended:false})); //transforma los datos de un formulario html en json
app.use(morgan('dev')) //para ver en consola las peticiones
app.use(cors())
app.use(rutas);  //agrego las rutas asociadas al servidor
//app.use(express.static("public")); 
app.listen(3000, () => {    //acá levanto al servidor en el puerto 3000
    console.log("Servidor en puerto 3000", 3000); 
})
*/