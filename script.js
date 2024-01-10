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

        // Guardar la información en localStorage
        const prestamo = {
            montoPrestado,
            tipoTasa,
            plazoMeses,
            tasaInteres,
            montoTotal,
        };

        // Obtener préstamos existentes o inicializar un array vacío
        const prestamosGuardados = JSON.parse(localStorage.getItem('prestamos')) || [];

        // Agregar el nuevo préstamo al array
        prestamosGuardados.push(prestamo);

        // Guardar el array actualizado en localStorage
        localStorage.setItem('prestamos', JSON.stringify(prestamosGuardados));

        // Actualizar la tabla de préstamos (puedes implementar esto según tu necesidad)
        mostrarPrestamos();
    });

    // Función para mostrar todos los préstamos realizados en la consola y actualizar la tabla
    function mostrarPrestamos() {
        const prestamos = JSON.parse(localStorage.getItem('prestamos')) || [];
        console.log('=== Préstamos Realizados ===');
        if (prestamos.length === 0) {
            console.log('No hay préstamos realizados.');
        } else {
           
            const tablaPrestamos = document.getElementById('prestamos-table');

            // Limpiar la tabla antes de agregar nuevas filas
            tablaPrestamos.innerHTML = '';

            // Encabezados de la tabla
            const encabezados = ['Monto prestado', 'Tipo de tasa', 'Plazo en meses', 'Tasa de interés', 'Monto total'];
            const encabezadoRow = document.createElement('tr');
            encabezados.forEach((encabezado) => {
                const th = document.createElement('th');
                th.textContent = encabezado;
                encabezadoRow.appendChild(th);
            });
            tablaPrestamos.appendChild(encabezadoRow);

            // Filas de la tabla
            prestamos.forEach((prestamo) => {
                const fila = document.createElement('tr');
                Object.values(prestamo).forEach((valor) => {
                    const td = document.createElement('td');
                    td.textContent = valor;
                    fila.appendChild(td);
                });
                tablaPrestamos.appendChild(fila);
            });
        }
    }

    // Ejecutar la función para mostrar los préstamos al cargar la página
    mostrarPrestamos();
});
