import {getArticuloActualizado,calcularInsumos} from './ControlStock.js'

async function borrarCarrito() {
    let claves = Object.keys(localStorage);
    let carrovacio = true;
    for (const clave of claves) {
        console.log("Tengo una clave:", clave);
        let valor = localStorage.getItem(clave);
        try {
            if (JSON.parse(valor).cantidad) {
                console.log("En esa clave el valor es:", Number(JSON.parse(valor).cantidad));
                await getmanufacturados(clave, Number(JSON.parse(valor).cantidad));
                carrovacio = false;
            }
        } catch (err) {
            console.log("err: " + err);
        }
    }

    if (carrovacio) {
        console.log("entró if ", carrovacio);
        return carrovacio;
    }

    console.log("fuera if ", carrovacio);
    return carrovacio;
}


async function getmanufacturados(id, cant) {
    console.log("id " + id + " cant " + cant)
    if (cant > 0) {
        let articulo = await getArticuloActualizado(id) //me traigo el manufact/insumo con los stock actualizados
        articulo = await calcularInsumos(articulo, -cant)
    }
    return true
}

async function borrarPedido(detallepedido){
    detallepedido.forEach(async item => {
        ('articulomanufacturadoid' in item)?await getmanufacturados(item.articulomanufacturadoid._id,item.cantidad)
        :await getmanufacturados(item.articuloinsumoid._id,item.cantidad)
    });

    return true
}

export { borrarCarrito, getmanufacturados, borrarPedido };