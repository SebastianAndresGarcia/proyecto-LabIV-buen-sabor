//control stock
function controlStock(insumos) { //no le puedo poner async porque me quedaba la promesa pendiente en donde yo invocaba la fcion
    //console.log("en controlStock", insumos)
    //console.log(insumos)
    if (insumos.detallearticulomanufacturadoid[0]) {
        for (let i = 0; i < insumos.detallearticulomanufacturadoid.length; i++) {
            if (insumos.detallearticulomanufacturadoid[i].cantidad > insumos.detallearticulomanufacturadoid[i].ArticuloInsumoid.stockActual) {
                console.log(insumos.detallearticulomanufacturadoid[i].cantidad + ">" + insumos.detallearticulomanufacturadoid[i].ArticuloInsumoid.stockActual)
                return false
                break
            }
        }
    } else {
        if (insumos.stockActual < 1)
            return false
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

//const calcularInsumos = async (detalle, j) => {
async function calcularInsumos(detalle, j) {
    console.log("detalle calcularInsumos..", detalle)
    if (detalle.detallearticulomanufacturadoid[0]) {
        for (let i = 0; i < detalle.detallearticulomanufacturadoid.length; i++) {
            let stock = detalle.detallearticulomanufacturadoid[i].ArticuloInsumoid.stockActual - (detalle.detallearticulomanufacturadoid[i].cantidad * j)
            console.log("stock " + detalle.detallearticulomanufacturadoid[i].ArticuloInsumoid.stockActual + "-" + detalle.detallearticulomanufacturadoid[i].cantidad * j + " :" + stock)
            let urlServer = "http://localhost:3000/ActualizarInsumo/" + detalle.detallearticulomanufacturadoid[i].ArticuloInsumoid.denominacion;
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
        const res = await fetch(
            `http://localhost:3000/getManufacturadoXid/${detalle._id}`
        )
        const resJson = await res.json();
        const array = resJson
        return array
    }
    else {
        let stock = detalle.stockActual - j
        console.log("stock (2)" + detalle.stockActual + "-" + j + " :" + stock)
        let urlServer = "http://localhost:3000/ActualizarInsumo/" + detalle.denominacion;
        let method = "POST";
        const respuesta = await fetch(urlServer, {
            method: method,
            body: JSON.stringify({ 'stockActual': stock }),
            headers: {
                "Content-type": "application/json",
            },
            mode: "cors",
        });
        const resJson = await respuesta.json()
        console.log("resJson calcularInsumos(2)", resJson)

        const res = await fetch(
            `http://localhost:3000/ArticuloInsumoxid/${detalle._id}`
        )
        const resJson2 = await res.json();
        const array = resJson2
        return array
    }
}

async function getArticuloActualizado(id) {
    console.log("id getArticuloActualizado..", id)
    try {
        const res = await fetch(
            `http://localhost:3000/getManufacturadoXid/${id}`
        )
        const resJson = await res.json();
        const array = resJson
        return array
    } catch (e) {
        const res = await fetch(
            `http://localhost:3000/ArticuloInsumoxid/${id}`
        )
        const resJson2 = await res.json();
        const array = resJson2
        return array
    }

}

export { controlStock, calcularInsumos, getArticuloActualizado };