//control stock
function controlStock(insumos) { //no le puedo poner async porque me quedaba la promesa pendiente en donde yo invocaba la fcion
    console.log(insumos)
    for (let i = 0; i < insumos.length; i++) {
        if (insumos[i].cantidad > insumos[i].ArticuloInsumoid.stockActual) {
            console.log(insumos[i].cantidad + ">" + insumos[i].ArticuloInsumoid.stockActual)
            return false
            break
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

export { controlStock, calcularInsumos };