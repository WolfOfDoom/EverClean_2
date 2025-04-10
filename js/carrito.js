document.addEventListener('DOMContentLoaded', function () {
    mostrarCarrito();
});

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemsContainer = document.getElementById('items-carrito');
    const totalElement = document.getElementById('total');

    // Agrupar productos por ID
    const productosAgrupados = carrito.reduce((acc, producto) => {
        if (!acc[producto.id]) {
            acc[producto.id] = {
                ...producto,
                cantidad: 1,
                precioTotal: producto.precio
            };
        } else {
            acc[producto.id].cantidad++;
            acc[producto.id].precioTotal += producto.precio;
        }
        return acc;
    }, {});

    // Mostrar productos agrupados
    itemsContainer.innerHTML = '';
    let subtotal = 0;

    Object.values(productosAgrupados).forEach(producto => {
        subtotal += producto.precioTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="item-imagen">
            <div class="item-info">
                <div class="item-nombre">
                    ${producto.nombre}
                    <span class="item-cantidad-badge">${producto.cantidad}</span>
                </div>
                <div class="item-precio">$${producto.precio} c/u</div>
                <div class="item-precio-total">Total: $${producto.precioTotal.toFixed(2)}</div>
            </div>
            <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;

        itemsContainer.appendChild(itemElement);
    });

    totalElement.textContent = subtotal.toFixed(2);
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Eliminar todas las ocurrencias del producto
    carrito = carrito.filter(producto => producto.id !== id);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    document.getElementById('cart-count').textContent = carrito.length;
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Eliminar todas las ocurrencias del producto
    carrito = carrito.filter(producto => producto.id !== id);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    if (producto && producto.inventario > 0) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push({ ...producto });
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Disminuir inventario
        producto.inventario--;
        actualizarInventario();
        actualizarContadorCarrito();

        // Mostrar notificación
        alert(`¡${producto.nombre} agregado al carrito! Quedan ${producto.inventario} en stock.`);
    } else {
        alert('Este producto está agotado');
    }
}

function actualizarInventario() {
    // Actualizar visualización en index.html
    document.querySelectorAll('.producto').forEach(elemento => {
        const id = parseInt(elemento.dataset.id);
        const producto = productos.find(p => p.id === id);
        if (producto) {
            elemento.querySelector('.inventario').textContent = `Disponibles: ${producto.inventario}`;
        }
    });
}