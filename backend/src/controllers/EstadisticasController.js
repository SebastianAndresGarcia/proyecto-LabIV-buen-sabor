// Reportes en excel: Ranking comidas más pedidas en un periodo de tiempo determinado
// Ingresos (recaudaciones) por períodos de tiempo. Diario / Mensual
// Cantidad de pedidos agrupados por cliente en un determinado periodo de tiempo.
// Monto de Ganancia en un periodo de tiempo (ventas - costos) 

const Factura = require('../models/Factura')
const User = require('../models/user.model')

exports.manufacturadosVendidos = async (req, res) => {
    const {params} = req
    const {fechaDesde, fechaHasta} = params

    const dateDesde = new Date(fechaDesde)
    //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
    //dateDesde.setTime(dateDesde.getTime() + (1000*60*60*24))
    //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
    //dateDesde.setHours(0,0,0,0)
    const dateHasta = new Date(fechaHasta)
    dateHasta.setDate(dateHasta.getDate() + 1);

    console.log("dateDesde ", dateDesde)
    console.log("dateHasta ", dateHasta)
    let rankingComidas = []
    const facturas = await Factura.find({ "fecha": { $gte: dateDesde, $lte: dateHasta } }).populate({
        path: "detallefacturaid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, imagen: 1 }, //elijo solo los campos que quiero traer
        }
    })
    console.log("todas facturas", facturas)
    for (const factura of facturas) {
        for (let i = 0; i < factura.detallefacturaid.length; i++) {
            if (factura.detallefacturaid[i].articulomanufacturadoid) { //Solo se tomaran en cuenta para el ranking articulos manufacturados
                let comida = factura.detallefacturaid[i].articulomanufacturadoid.denominacion
                console.log("comida " ,factura.detallefacturaid[i].articulomanufacturadoid)
                console.log("cantidad " ,factura.detallefacturaid[i].cantidad)
                let articuloEncontrado = false
                for (let j = 0; j < rankingComidas.length; j++) { //Buscamos en el ranking si la comida ya fue agregada
                    if (rankingComidas[j].comida === comida) {
                        rankingComidas[j].cantidadPedida += factura.detallefacturaid[i].cantidad
                        articuloEncontrado = true
                        break
                    }
                }
                //Si no fue agregada aún la agregamos
                if (!articuloEncontrado) {
                    rankingComidas = rankingComidas.concat({ comida: comida, cantidadPedida: factura.detallefacturaid[i].cantidad })
                }
            }
        }
        //}
    }
    rankingComidas.sort(((a, b) => b.cantidadPedida - a.cantidadPedida))
    console.log("rankingComidas", rankingComidas)
    return res.json(rankingComidas)
}

exports.pedidosXcliente = async (req, res) => {
    const {params} = req
    const {fechaDesde, fechaHasta} = params
    
    const dateDesde = new Date(fechaDesde)
    //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
    // dateDesde.setTime(dateDesde.getTime() + (1000*60*60*24))
    //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
    //dateDesde.setHours(0,0,0,0)
    const dateHasta = new Date(fechaHasta)
    dateHasta.setTime(dateHasta.getTime() + (1000 * 60 * 60 * 23))
    //dateHasta.setHours(0,0,0,0)
    console.log("dateDesde ", dateDesde)
    console.log("dateHasta ", dateHasta)
    let rankingCliente = []
    const usuarios = await User.find({ "pedidosid.0": { "$exists": true } }).populate({
        path: "pedidosid",
        match: { "estado": "facturado" },
        select: { numero: 1, total: 1, fecha: 1 }
    })

    console.log("usuarios ", usuarios)
    for (const usuario of usuarios) {
        if (usuario.pedidosid[0]) {
            let cantidad = 0
            let auxPedidos = []
            for (let i = 0; i < usuario.pedidosid.length; i++) {
                const fechaFormateada = (usuario.pedidosid[i].fecha).toJSON().substr(0, 10)
                console.log("fechaFormateada ", fechaFormateada)
                const datePedido = new Date(fechaFormateada || null)
                //datePedido.setHours(0,0,0,0)
                console.log("datePedido " + datePedido)
                if (datePedido >= dateDesde && datePedido <= dateHasta) {
                    cantidad = cantidad + 1
                    auxPedidos.push(usuario.pedidosid[i])
                }
            }
            if (auxPedidos[0]) {
                rankingCliente.push({ nombreusuario: usuario.username, usermail: usuario.email, cantidadpedidos: cantidad, pedidos: auxPedidos })
            }
        }
    }
    rankingCliente.sort(((a, b) => b.cantidadpedidos - a.cantidadpedidos))
    console.log("rankingCliente", rankingCliente)
    return res.json(rankingCliente)
}

// //GANANCIAS -----------------------------------------------------------------------------------------------
exports.ganancias = async (req, res) => {
    const {params} = req
    const {fechaDesde, fechaHasta} = params
    const dateDesde = new Date(fechaDesde)
    //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
    dateDesde.setTime(dateDesde.getTime() + (1000 * 60 * 60 * 24))
    //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
    dateDesde.setHours(0, 0, 0, 0)
    const dateHasta = new Date(fechaHasta)
    dateHasta.setDate(dateHasta.getDate() + 1);
    let ventas = 0
    let costos = 0
    const facturas = await Factura.find({ "fecha": { $gte: dateDesde, $lte: dateHasta } }).populate({
        path: "detallefacturaid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, imagen: 1 }, //elijo solo los campos que quiero traer
        }
    })
    console.log(facturas)
    for (let i = 0; i < facturas.length; i++) {
        ventas = ventas + facturas[i].totalVenta
        costos = costos + facturas[i].totalCosto
    }
    const ganancias = { 'ventas': ventas, 'costos': costos, 'balance': (ventas - costos) }
    console.log("ganancias", ganancias)
    return res.json({ facturas, ganancias })
}

//Recaudaciones (Diaria/Mensual)
exports.recaudaciones = async (req, res) => {
    const {params} = req
    const {fechaDesde, fechaHasta} = params
    const dateDesde = new Date(fechaDesde)
    //EL INPUT DATE DEL FRONTEND VIENE CON UN DÍA MENOS ASI QUE LO AGREGAMOS
    dateDesde.setTime(dateDesde.getTime() + (1000 * 60 * 60 * 24))
    //SE SETEAN TODAS LAS HORAS EN 0 ASI PODEMOS COMPARAR LAS FECHAS SIN PREOCUPARNOS DE LA HORA
    dateDesde.setHours(0, 0, 0, 0)
    const dateHasta = new Date(fechaHasta)
    console.log(dateHasta)
    dateHasta.setDate(dateHasta.getDate() + 1);
    console.log(dateHasta)
    let ventas = 0
    const facturas = await Factura.find({ "fecha": { $gte: dateDesde, $lte: dateHasta } }).populate({
        path: "detallefacturaid", // populate blogs
        populate: {
            path: "articulomanufacturadoid", // in blogs, populate comments
            select: { denominacion: 1, _id: 1, precioCompra: 1, imagen: 1 }, //elijo solo los campos que quiero traer
        }
    })
    for (let i = 0; i < facturas.length; i++) {
        ventas = ventas + facturas[i].totalVenta
    }
    const ingresos = { 'ventas': ventas }
    console.log("ingresos", ingresos)
    return res.json({ facturas, ingresos })
}