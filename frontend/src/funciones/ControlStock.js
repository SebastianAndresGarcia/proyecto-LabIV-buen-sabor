//control stock
function controlStock(insumos) { //no le puedo poner async porque me quedaba la promesa pendiente en donde yo invocaba la fcion
    console.log("en controlStock", insumos)
    if (insumos.detallearticulomanufacturadoid.length>0) { //con esto filtro si es un array o viene solo un number
        for (let i = 0; i < insumos.detallearticulomanufacturadoid.length; i++) {
            if (insumos.detallearticulomanufacturadoid[i].cantidad > insumos.detallearticulomanufacturadoid[i].ArticuloInsumoid.stockActual) {
                console.log(insumos.detallearticulomanufacturadoid[i].cantidad + ">" + insumos.detallearticulomanufacturadoid[i].ArticuloInsumoid.stockActual)
                return false
                break
            }
        }
    }
    else {
        if (insumos < 1) {
            return false
        }
    }
    return true
}

// export default calcularInsumos(id) { //no le puedo poner async porque me quedaba la promesa pendiente en donde yo invocaba la fcion
//     console.log(id)
//     const res = await fetch(
//         "http://localhost:3000/articulosmanufacturados"
//     )
//     const resJson = res.json();
//     console.log(resJson);
//     this.manufacturadosData = resJson;
//     return res.json()
// }

const calcularInsumos = async (detalle, j) => {
    console.log("detalle calcularInsumos", detalle)
    if (detalle[0]) { //con esto filtro si es un array o viene solo un number
        for (let i = 0; i < detalle.length; i++) {
            let stock = detalle[i].ArticuloInsumoid.stockActual - (detalle[i].cantidad * j)
            console.log("stock " + detalle[i].ArticuloInsumoid.stockActual + "-" + detalle[i].cantidad * j + " :" + stock)
            let urlServer = "http://localhost:3000/ActualizarInsumo/" + detalle[i].ArticuloInsumoid.denominacion;
            let method = "POST";
            const respuesta = await fetch(urlServer, {
                method: method,
                body: JSON.stringify({ 'stockActual': stock }),
                headers: {
                    "Content-type": "application/json",
                },
                mode: "cors",
            });
            stock = 0
            const resJson = await respuesta.json()
            console.log("resJson calcularInsumos", resJson)
        }
    }
    else {
        let stock = detalle.stockActual - j
        console.log("stock(2) " + detalle.stockActual + "-" + j + " =" + stock)
        let urlServer = "http://localhost:3000/ActualizarInsumo/" + detalle._id;
        let method = "POST";
        const respuesta = await fetch(urlServer, {
            method: method,
            body: JSON.stringify({ 'stockActual': stock }),
            headers: {
                "Content-type": "application/json",
            },
            mode: "cors",
        });
        stock = 0
        const resJson = await respuesta.json()
        console.log("resJson calcularInsumos(2)", resJson)
    }
}

export { controlStock, calcularInsumos };