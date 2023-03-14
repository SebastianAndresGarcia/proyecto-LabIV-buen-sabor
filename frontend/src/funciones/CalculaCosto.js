async function calculaCosto(detalle) { 
    //DETALLE:
    // articulomanufacturadoid 
    //      denominacion
    //      precioVenta
    //      _id
    // cantidad
    // facturaid
    // subtotal
    // _id

    if (detalle[0]) {
        let costo = 0
        for (let i = 0; i < detalle.length; i++) {
            const res = await fetch(
                `http://localhost:3000/getManufacturadoXid/${detalle[i].articulomanufacturadoid._id}`
            )

            const resJson = await res.json();
            const array = resJson.detallearticulomanufacturadoid
            console.log("detalleartmanufacturado ", array)
            for (let j = 0; j < array.length; j++) {
                costo = costo + [array[j].cantidad * (array[j].ArticuloInsumoid.precioCompra)]*detalle[i].cantidad
            }
        }
        console.log("costo " + costo)
        return costo
    }

}

export { calculaCosto };