import {getArticuloActualizado,calcularInsumos} from './ControlStock.js'

async function borrarCarrito() {
    let claves = Object.keys(localStorage);
    let carrovacio = true
    claves.forEach(clave => {
        console.log("Tengo una clave:", clave);
        let valor = localStorage.getItem(clave);
        try {
            if (((JSON.parse(localStorage.getItem(clave))).cantidad)) {
                console.log("En esa clave el valor es:", Number((JSON.parse(localStorage.getItem(clave))).cantidad))
                getmanufacturados(clave, Number((JSON.parse(localStorage.getItem(clave))).cantidad))
                carrovacio = false
            }
        } catch (err) {
            console.log("err: " + err)
        }
    });
    if (carrovacio) {
        return carrovacio
    }
    return carrovacio
}

async function getmanufacturados(id, cant) {
    console.log("id " + id + " cant " + cant)
    if (cant > 0) {
        let articulo = await getArticuloActualizado(id) //me traigo el manufact/insumo con los stock actualizados
        articulo = await calcularInsumos(articulo, -cant)
    }
    return true
}

export { borrarCarrito, getmanufacturados };