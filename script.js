document.addEventListener('DOMContentLoaded', function () {
    // Manejar el evento del botón Calcular
    document.getElementById('calculate-btn').addEventListener('click', function () {
        // Obtener información del formulario
        const montoPrestado = parseFloat(document.getElementById('monto').value);
        const tipoTasa = document.getElementById('tipoTasa').value.toLowerCase();
        const plazoMeses = parseInt(document.getElementById('plazo').value);

        // Validar la información del formulario
        if (isNaN(montoPrestado) || montoPrestado <= 0 || !['baja', 'media', 'alta'].includes(tipoTasa) || isNaN(plazoMeses) || plazoMeses <= 0) {
            alert('Por favor, ingrese información válida.');
            return;
        }

        // Definición de tasas de interés //
        const tasasDeInteres = {
            baja: { 6: 0.03 },
            media: { 12: 0.05 },
            alta: { 24: 0.12 },
        };

        // Validar que el tipo de tasa y el plazo coincidan
        if (!tasasDeInteres[tipoTasa].hasOwnProperty(plazoMeses)) {
            alert('La combinación de tipo de tasa y plazo no es válida. Por favor, seleccione valores compatibles.');
            return;
        }

        // Obtener la tasa de interés en función de la duración
        const tasaInteres = tasasDeInteres[tipoTasa][plazoMeses];

        // Calcular el monto total a pagar
        const montoTotal = montoPrestado + montoPrestado * tasaInteres * plazoMeses;

        // Mostrar los resultados al usuario
        alert(`
            Monto prestado: $${montoPrestado}
            Plazo en meses: ${plazoMeses}
            Tasa de interés: ${tasaInteres * 100}%
            Monto total a pagar: $${montoTotal.toFixed(2)}
            Monto a devolver: $${montoTotal.toFixed(2)}
        `);
    });
});
