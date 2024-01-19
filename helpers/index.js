export const formatearDinero = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: "currency",
        currency: "USD"
    })
}

//* funcion encargada de convertir un Date.now pasado a milisegundos , la convierte en el formato dd/mm/año
export const fechaDDMMAAAA = (fecha) => {
    const fechaActual = new Date(parseInt(fecha));
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
    const anio = fechaActual.getFullYear();

    return `${dia}/${mes}/${anio}`;
}