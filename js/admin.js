let productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: 1, nombre: "Zapatillas Running", precio: 50, imagen: "img/zapato1.jpg" },
    { id: 2, nombre: "Botas de Cuero", precio: 80, imagen: "img/zapato2.jpg" }
];

function cargarProductos() {
    const lista = document.getElementById("lista-productos");
    lista.innerHTML = "";

    productos.forEach(producto => {
        lista.innerHTML += `
            <div class="producto-admin">
                <p>${producto.nombre} - $${producto.precio}</p>
                <button onclick="editarProducto(${producto.id})">Editar</button>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </div>
        `;
    });
}

// Añadir producto
document.getElementById("form-add-product").addEventListener("submit", function (e) {
    e.preventDefault();
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: document.getElementById("product-name").value,
        precio: parseInt(document.getElementById("product-price").value),
        imagen: document.getElementById("product-image").value || "img/default.jpg"
    };

    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();
    this.reset();
});

// Eliminar producto
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();
}

// Editar producto (simplificado)
function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    const nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
    const nuevoPrecio = prompt("Nuevo precio:", producto.precio);

    if (nuevoNombre && nuevoPrecio) {
        producto.nombre = nuevoNombre;
        producto.precio = parseInt(nuevoPrecio);
        localStorage.setItem("productos", JSON.stringify(productos));
        cargarProductos();
    }
}

// Cargar productos al iniciar
cargarProductos();