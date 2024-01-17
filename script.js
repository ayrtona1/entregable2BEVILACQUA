document.addEventListener('DOMContentLoaded', function () {
    // Manejar el evento del botón Calcular
    document.getElementById('calculate-btn').addEventListener('click', function () {
        // ... (tu código actual)

        // Actualizar la tabla de préstamos al calcular uno nuevo
        mostrarPrestamos();
    });

    // Función para mostrar todos los préstamos realizados en la consola y actualizar la tabla
    function mostrarPrestamos() {
        const prestamos = JSON.parse(localStorage.getItem('prestamos')) || [];
        console.log('=== Préstamos Realizados ===', prestamos);

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

    // Ejecutar la función para mostrar los préstamos al cargar la página
    mostrarPrestamos();
});

