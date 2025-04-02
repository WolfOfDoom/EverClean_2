// Productos iniciales con inventario
let productos = JSON.parse(localStorage.getItem("productos")) || [
    {
        id: 1,
        nombre: "Zapatillas Running",
        precio: 50,
        imagen: "img/zapato1.jpg",
        inventario: 10
    },
    {
        id: 2,
        nombre: "Botas de Cuero",
        precio: 80,
        imagen: "img/zapato2.jpg",
        inventario: 10
    }
];

// Guardar productos iniciales solo si no existen
if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Mostrar botón de Admin si el rol es "admin"
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("userRole") === "admin") {
        document.getElementById("btn-admin").style.display = "inline-block";
    }
    cargarCatalogo();
    actualizarContadorCarrito();
});

// Función para cargar el catálogo con inventario
function cargarCatalogo() {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";

    const productosActualizados = JSON.parse(localStorage.getItem("productos")) || productos;

    productosActualizados.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.className = 'producto';
        productoElemento.dataset.id = producto.id;
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <p class="inventario ${producto.inventario <= 0 ? 'agotado' : ''}">
                ${producto.inventario <= 0 ? 'AGOTADO' : `Disponibles: ${producto.inventario}`}
            </p>
            <button onclick="agregarAlCarrito(${producto.id})" 
                ${producto.inventario <= 0 ? 'disabled' : ''}>
                ${producto.inventario <= 0 ? 'Agotado' : 'Añadir al carrito'}
            </button>
        `;
        catalogo.appendChild(productoElemento);
    });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar al carrito con control de inventario
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);

    if (!producto) return;

    if (producto.inventario <= 0) {
        alert('Este producto está agotado');
        return;
    }

    // Disminuir inventario
    producto.inventario--;
    localStorage.setItem("productos", JSON.stringify(productos));

    // Actualizar visualización
    actualizarInventarioProducto(idProducto);

    // Agregar al carrito
    carrito.push({ ...producto });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();

    alert(`¡${producto.nombre} agregado al carrito!`);
}

function actualizarInventarioProducto(idProducto) {
    const productoElemento = document.querySelector(`.producto[data-id="${idProducto}"]`);
    if (productoElemento) {
        const producto = productos.find(p => p.id === idProducto);
        const inventarioElement = productoElemento.querySelector('.inventario');
        const botonElement = productoElemento.querySelector('button');

        inventarioElement.textContent = producto.inventario <= 0 ? 'AGOTADO' : `Disponibles: ${producto.inventario}`;
        inventarioElement.className = `inventario ${producto.inventario <= 0 ? 'agotado' : ''}`;

        botonElement.textContent = producto.inventario <= 0 ? 'Agotado' : 'Añadir al carrito';
        botonElement.disabled = producto.inventario <= 0;
    }
}

// Resto de funciones existentes (actualizarCarrito, mostrarCarrito, eliminarDelCarrito, etc.)
// ... [mantén el resto de tus funciones como estaban]

// Animación del título y funciones del carrusel
// ... [mantén tus funciones de animación y carrusel]

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

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos el h2 que contiene el texto completo
    const title = document.querySelector('h2');

    // Extraemos el texto completo
    const fullText = title.textContent;

    // Limpiamos el contenido del h2
    title.textContent = '';

    // Dividimos el texto en palabras y luego en letras
    const words = fullText.split(' ');

    words.forEach((word, wordIndex) => {
        // Creamos un span para cada palabra
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.marginRight = '8px'; // Espacio entre palabras

        // Dividimos la palabra en letras
        const letters = word.split('');

        letters.forEach((letter, letterIndex) => {
            // Creamos un span para cada letra
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.style.display = 'inline-block';
            letterSpan.style.opacity = '0';
            letterSpan.style.transform = 'translateY(20px)';
            letterSpan.style.transition = `opacity 0.5s ease ${(wordIndex * 0.2) + (letterIndex * 0.1)}s, transform 0.5s ease ${(wordIndex * 0.2) + (letterIndex * 0.1)}s`;

            wordSpan.appendChild(letterSpan);

            // Aplicamos la animación después de un pequeño retraso
            setTimeout(() => {
                letterSpan.style.opacity = '1';
                letterSpan.style.transform = 'translateY(0)';
            }, 100);
        });

        title.appendChild(wordSpan);
    });
});

// dark-mode.js
document.addEventListener('DOMContentLoaded', function () {
    const darkModeSwitch = document.getElementById('dark-mode-switch');

    // Cargar preferencia guardada
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }

    // Escuchar cambios en el switch
    darkModeSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});


