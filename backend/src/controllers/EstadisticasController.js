// Reportes en excel: Ranking comidas más pedidas en un periodo de tiempo determinado
// Ingresos (recaudaciones) por períodos de tiempo. Diario / Mensual
// Cantidad de pedidos agrupados por cliente en un determinado periodo de tiempo.
// Monto de Ganancia en un periodo de tiempo (ventas - costos) 
//const ArticuloManufacturado = require('../models/ArticuloManufacturado');
const Pedido = require('../models/Pedido')
const Factura = require('../models/Factura')
const User = require('../models/user.model')
//const ArticuloInsumo = require('../models/ArticuloInsumo')


exports.manufacturadosVendidos = async (req, res) =>{
    console.log("req.body en estadisticas ", req.body)
    const fechaDesde=req.body.fechaDesde
    const fechaHasta=req.body.fechaHasta
    if(!fechaDesde || !fechaHasta){
        return res.status(400).json({error:"Ingrese las dos fechas para crear el ranking."})
    }
    const dateDesde = new Date(fechaDesde)
    //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
    // dateDesde.setTime(dateDesde.getTime() + (1000*60*60*24))
    //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
    dateDesde.setHours(0,0,0,0)
    const dateHasta = new Date(fechaHasta)
    // dateHasta.setTime(dateHasta.getTime() + (1000*60*60*24))
    dateHasta.setHours(0,0,0,0)
        
    let rankingComidas = []
    const facturas = await Factura.find({}).populate({
        path: "detallefacturaid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, imagen: 1 }, //elijo solo los campos que quiero traer
        }
    })
    console.log("todas facturas", facturas)
        for(const factura of facturas){
            console.log("dentro de for factura.fecha", factura.fecha)
            const fechaFormateada = (factura.fecha).toJSON().substr(0,10)
            //fechaFormateada=fechaFormateada.substr(0,9)
            console.log("fechaFormateada ",fechaFormateada) 
            const datePedido = new Date(fechaFormateada || null)
            datePedido.setHours(0,0,0,0)
            console.log("datePedido "+datePedido)
                if(datePedido >= dateDesde && datePedido <= dateHasta){
                    for (let i = 0; i < factura.detallefacturaid.length; i++) {
                        //Obtenemos los articulos pedidos en los pedidos que están entre las fechas indicadas
                        //const comida = await DetallePedido.findById(detalle)
                        if(factura.detallefacturaid[i].articulomanufacturadoid){ //Solo se tomaran en cuenta para el ranking articulos manufacturados
                            let comida=factura.detallefacturaid[i].articulomanufacturadoid.denominacion
                            console.log("comida "+comida)
                            let articuloEncontrado = false
                            for(let j=0;j<rankingComidas.length;j++){ //Buscamos en el ranking si la comida ya fue agregada
                                if(rankingComidas[j].comida === comida){
                                    rankingComidas[j].cantidad += factura.detallefacturaid[i].cantidad
                                    articuloEncontrado = true
                                    break
                                }
                            }
                            //Si no fue agregada aún la agregamos
                            if(!articuloEncontrado)
                             {
                                rankingComidas = rankingComidas.concat({comida:comida, cantidadPedida:factura.detallefacturaid[i].cantidad})
                                }
                            
                        }
                    }
                    //console.log('facturados ',factura)
                }
        }
    rankingComidas.sort(((a, b) => b.cantidadPedida - a.cantidadPedida))
    console.log("rankingComidas", rankingComidas)
    return res.json(rankingComidas)
}

exports.pedidosXcliente = async (req, res) =>{
    console.log("req.body en estadisticas ", req.body)
    const fechaDesde=req.body.fechaDesde
    const fechaHasta=req.body.fechaHasta

    const dateDesde = new Date(fechaDesde)
    //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
    // dateDesde.setTime(dateDesde.getTime() + (1000*60*60*24))
    //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
    dateDesde.setHours(0,0,0,0)
    const dateHasta = new Date(fechaHasta)
    // dateHasta.setTime(dateHasta.getTime() + (1000*60*60*24))
    dateHasta.setHours(0,0,0,0)
        
    let rankingCliente = []
    const usuarios = await User.find({ "pedidosid.0": { "$exists": true } }).populate({
        path: "pedidosid",
        match: { "estado": "terminado" },
        select: { numero: 1, total: 1, fecha: 1 }
    })
    //const usuarios = await User.find({  $where: 'this.pedidosid.length>0' })
    console.log("usuarios ", usuarios)
        for(const usuario of usuarios){
            let cantidad=0
            for (let i = 0; i < usuario.pedidosid.length; i++) {           
            const fechaFormateada = (usuario.pedidosid[i].fecha).toJSON().substr(0,10)
            console.log("fechaFormateada ",fechaFormateada) 
            const datePedido = new Date(fechaFormateada || null)
            datePedido.setHours(0,0,0,0)
            console.log("datePedido "+datePedido)
                if(datePedido >= dateDesde && datePedido <= dateHasta){
                        //Obtenemos los articulos pedidos en los pedidos que están entre las fechas indicadas
                        //const comida = await DetallePedido.findById(detalle)
                    cantidad = cantidad+1
                    if(i==(usuario.pedidosid.length-1))//si terminó de recorrer los pedidos que guarde el cliente con sus pedidos en el ranking
                    rankingCliente=rankingCliente.concat({nombreusuario:usuario.username, usermail: usuario.email, cantidadpedidos:cantidad, pedidos: usuario.pedidosid})       
                   
                }
            }
            
        }
    rankingCliente.sort(((a, b) => b.cantidadpedidos - a.cantidadpedidos))
    console.log("rankingCliente", rankingCliente)
    return res.json(rankingCliente)
 }

// //INGRESOS -----------------------------------------------------------------------------------------------
// reportesRouter.get('/ingresos/:fechaDesde/:fechaHasta', async(req, res) => {
//     const {params} = req
//     const {fechaDesde, fechaHasta} = params
//     if(!fechaDesde || !fechaHasta){
//         return res.status(400).json({error:"Ingrese las dos fechas para crear el ranking."})
//     }
//     const dateDesde = new Date(fechaDesde)
//     //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
//     // dateDesde.setTime(dateDesde.getTime() + (1000*60*60*24))
//     //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
//     dateDesde.setHours(0,0,0,0)
//     const dateHasta = new Date(fechaHasta)
//     // dateHasta.setTime(dateHasta.getTime() + (1000*60*60*24))
//     dateHasta.setHours(0,0,0,0)  
//     let fechasIngresos = []
//     const pedidos = await Pedido.find({})
//         for(const pedido of pedidos){
//             const fechaFormateada = formatDate(pedido.fecha)
//             const datePedido = new Date(fechaFormateada || null)
//             datePedido.setHours(0,0,0,0)
//                 if(datePedido >= dateDesde && datePedido <= dateHasta){
//                     let fechaEncontrada = false
//                     for(const fechaIngreso of fechasIngresos){
//                     if(fechaIngreso.fecha === datePedido.toLocaleDateString()){
//                         let index = fechasIngresos.findIndex(date => date.fecha === fechaIngreso.fecha)
//                         fechasIngresos[index] = {fecha: fechaIngreso.fecha, ingresos: fechasIngresos[index].ingresos + pedido.total}
//                         fechaEncontrada = true
//                         break
//                     }
//                 }
//                 //Si no fue agregada aún la agregamos
//                 if(!fechaEncontrada)
//                 fechasIngresos = fechasIngresos.concat({fecha:datePedido.toLocaleDateString(), ingresos:pedido.total})
//                 }
//             }
//     return res.json(fechasIngresos)
// })

// //GANANCIAS-----------------------------------------------------------------------
// reportesRouter.get('/ganancias/:fechaDesde/:fechaHasta', async(req, res) => {
//     const {params} = req
//     const {fechaDesde, fechaHasta} = params
//     if(!fechaDesde || !fechaHasta){
//         return res.status(400).json({error:"Ingrese las dos fechas para crear el ranking."})
//     }
//     const dateDesde = new Date(fechaDesde)
//     //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
//     // dateDesde.setTime(dateDesde.getTime() + (1000*60*60*24))
//     //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
//     dateDesde.setHours(0,0,0,0)
//     const dateHasta = new Date(fechaHasta)
//     // dateHasta.setTime(dateHasta.getTime() + (1000*60*60*24))
//     dateHasta.setHours(0,0,0,0)
    
//     let fechasGanancias = []
//     const pedidos = await Pedido.find({})
//         for(const pedido of pedidos){
//                 const fechaFormateada = formatDate(pedido.fecha)
//                 const datePedido = new Date(fechaFormateada || null)
//                 datePedido.setHours(0,0,0,0)
                
//                 if(datePedido >= dateDesde && datePedido <= dateHasta){
//                     let fechaEncontrada = false
//                     for(const fechaIngreso of fechasGanancias){
//                     if(fechaIngreso.fecha === datePedido.toLocaleDateString()){
//                         let index = fechasGanancias.findIndex(date => date.fecha === fechaIngreso.fecha)
//                         fechasGanancias[index] = {...fechasGanancias[index], ingresos: fechasGanancias[index].ingresos + pedido.total}
//                         fechaEncontrada = true
//                         break
//                     }
//                 }
//                 //Si no fue agregada aún la agregamos
//                 if(!fechaEncontrada)
//                 fechasGanancias = fechasGanancias.concat({fecha:datePedido.toLocaleDateString(), ingresos:pedido.total})
//                 }
//             }
            
//     const insumos = await ArticuloInsumo.find({})
//         for(const insumo of insumos){
//             if(insumo.fecha){
//             const fechaFormateada = formatDate(insumo.fecha)
//             const dateInsumo = new Date(fechaFormateada || null)
//                 dateInsumo.setHours(0,0,0,0)
            
//             if(dateInsumo >= dateDesde && dateInsumo <= dateHasta){
//                 let fechaEncontrada = false
//                 for(const fechaIngreso of fechasGanancias){
//                 if(fechaIngreso.fecha === dateInsumo.toLocaleDateString()){
//                     let index = fechasGanancias.findIndex(date => date.fecha === fechaIngreso.fecha)
                    
//                     fechasGanancias[index] = {...fechasGanancias[index], gastos: (fechasGanancias[index].gastos || 0) + insumo.precioCompra}
//                     fechaEncontrada = true
//                     break
//                 }
//             }
//             //Si no fue agregada aún la agregamos
//             if(!fechaEncontrada)
//             fechasGanancias = fechasGanancias.concat({fecha:dateInsumo.toLocaleDateString(), gastos:insumo.precioCompra})
//             }}
//         }    
//             //console.log(fechasGanancias)
//     return res.json(fechasGanancias)
// })

// module.exports = reportesRouter