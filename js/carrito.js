// Mostrar items del carrito
// Función para mostrar el carrito con botones de eliminar
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("items-carrito");
    let total = 0;

    contenedor.innerHTML = ""; // Limpiar el contenedor

    carrito.forEach((producto, index) => {
        contenedor.innerHTML += `
            <div class="item-carrito">
                <p>${producto.nombre} - $${producto.precio}</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
        total += producto.precio;
    });

    document.getElementById("total").textContent = total;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // Elimina el producto en la posición 'index'
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Actualiza la vista
    actualizarContadorCarrito(); // Actualiza el contador en el header
}

// Función para actualizar el contador del carrito (en el header)
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("cart-count").textContent = carrito.length;
}

// Cargar el carrito al abrir la página
window.onload = mostrarCarrito;
mostrarCarrito();