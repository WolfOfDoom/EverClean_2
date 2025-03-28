// 1. Cargar productos desde localStorage o usar los predeterminados
let productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: 1, nombre: "Zapatillas Running", precio: 50, imagen: "img/zapato1.jpg" },
    { id: 2, nombre: "Botas de Cuero", precio: 80, imagen: "img/zapato2.jpg" }
];

// 2. Guardar productos iniciales solo si no existen
if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// 3. Mostrar botón de Admin si el rol es "admin"
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("userRole") === "admin") {
        document.getElementById("btn-admin").style.display = "inline-block";
    }
    cargarCatalogo(); // Cargar catálogo después de que el DOM esté listo
});

// 4. Función para cargar el catálogo
function cargarCatalogo() {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = ""; // Limpiar antes de cargar

    // Usar los productos actualizados de localStorage
    const productosActualizados = JSON.parse(localStorage.getItem("productos")) || productos;

    productosActualizados.forEach(producto => {
        catalogo.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
            </div>
        `;
    });
}

// Resto del código (carrito) se mantiene igual...
let carrito = [];

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
    document.getElementById("cart-count").textContent = carrito.length;
}

function mostrarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    let html = "";
    let total = 0;

    carritoGuardado.forEach((item, index) => {
        html += `
            <div class="item-carrito">
                <p>${item.nombre} - $${item.precio}</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
        total += item.precio;
    });

    document.getElementById("items-carrito").innerHTML = html;
    document.getElementById("total").textContent = total;
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // Elimina el item en la posición `index`
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Actualiza la vista
    actualizarContadorCarrito(); // Actualiza el número en el header
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("cart-count").textContent = carrito.length;
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    alert("Sesión cerrada correctamente");
    window.location.href = "login.html"; // Redirige al login
}

// Mostrar/ocultar botones según el estado de autenticación
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const btnLogout = document.getElementById("btn-logout");
    const btnLogin = document.getElementById("btn-login");
    const btnAdmin = document.getElementById("btn-admin");

    if (isLoggedIn) {
        btnLogout.style.display = "inline-block";
        btnLogin.style.display = "none"; // Oculta el botón de login
        if (localStorage.getItem("userRole") === "admin") {
            btnAdmin.style.display = "inline-block";
        }
    } else {
        btnLogout.style.display = "none";
        btnLogin.style.display = "inline-block";
    }

    // Evento para el botón de cerrar sesión
    btnLogout.addEventListener("click", cerrarSesion);
});

let currentIndex = 0;

function moverCarrusel(direction) {
    const items = document.querySelectorAll('.carrusel-item');
    currentIndex += direction;

    // Lógica para circular el carrusel
    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
        currentIndex = 0;
    }

    // Mueve el carrusel
    document.querySelector('.carrusel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Cambio automático cada 5 segundos (opcional)
setInterval(() => moverCarrusel(1), 5000);