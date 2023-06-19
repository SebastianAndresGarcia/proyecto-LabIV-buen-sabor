function horaFormateada(fecha) {
    
 fecha = new Date(fecha);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const anio = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    // Formatear la fecha
    const fechaFormateada = `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada
}
export { horaFormateada };