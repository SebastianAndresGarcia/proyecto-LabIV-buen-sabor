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
export { controlStock };