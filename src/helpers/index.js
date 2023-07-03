export const formatearDinero = (monto) => {
    const formatoMoneda = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
    });

    monto = formatoMoneda.format(monto);

    return monto;
}

export const generarId = () => {
    const fecha = Date.now();

    const numAleatorio = Math.floor(Math.random() * 1000);

    const id = fecha.toString() + numAleatorio.toString();

    return id;
}

export const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones);
}