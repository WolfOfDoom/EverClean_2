document.addEventListener('DOMContentLoaded', function () {
    // Cargar productos
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify(productos));
    } else {
        productos = JSON.parse(localStorage.getItem('productos'));
    }

    mostrarInventario();
    setupFormularioProducto();
});

function mostrarInventario() {
    const tabla = document.getElementById('tabla-inventario');
    tabla.innerHTML = '';

    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.inventario}</td>
            <td class="acciones-inventario">
                <input type="number" id="repuesto-${producto.id}" min="1" value="1">
                <button onclick="reponerInventario(${producto.id})">Reponer</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function reponerInventario(id) {
    const cantidadInput = document.getElementById(`repuesto-${id}`);
    const cantidad = parseInt(cantidadInput.value);
    const producto = productos.find(p => p.id === id);

    if (producto && cantidad > 0) {
        producto.inventario += cantidad;
        localStorage.setItem('productos', JSON.stringify(productos));

        // Resetear el input
        cantidadInput.value = 1;

        mostrarInventario();
        alert(`Se repusieron ${cantidad} unidades de ${producto.nombre}\nNuevo inventario: ${producto.inventario}`);

        // Actualizar index.html si está abierto
        if (window.opener) {
            window.opener.actualizarInventarioProducto(id);
        }
    } else {
        alert('Por favor ingrese una cantidad válida');
    }
}

function setupFormularioProducto() {
    document.getElementById('form-add-product').addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('product-name').value.trim();
        const precio = parseFloat(document.getElementById('product-price').value);
        const imagen = document.getElementById('product-image').value.trim() || 'img/default.jpg';

        if (!nombre || isNaN(precio) || precio <= 0) {
            alert('Por favor complete todos los campos correctamente');
            return;
        }

        const nuevoProducto = {
            id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
            nombre,
            precio,
            imagen,
            inventario: 10 // Inventario inicial
        };

        productos.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(productos));

        mostrarInventario();
        this.reset();
        alert('¡Producto agregado correctamente!');
    });
}

// Agrega esto al final del evento DOMContentLoaded
mostrarProductosEditables();

// Nueva función para mostrar productos editables
function mostrarProductosEditables() {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-editable';
        productoDiv.innerHTML = `
            <div class="producto-info">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio}</p>
                    <p>Inventario: ${producto.inventario}</p>
                </div>
            </div>
            <div class="producto-acciones">
                <button onclick="editarProducto(${producto.id})">Editar</button>
                <button onclick="eliminarProducto(${producto.id})" class="btn-eliminar">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(productoDiv);
    });
}

// Función para editar producto (ejemplo básico)
function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        const nuevoNombre = prompt('Nuevo nombre:', producto.nombre);
        const nuevoPrecio = parseFloat(prompt('Nuevo precio:', producto.precio));

        if (nuevoNombre && !isNaN(nuevoPrecio)) {
            producto.nombre = nuevoNombre;
            producto.precio = nuevoPrecio;
            localStorage.setItem('productos', JSON.stringify(productos));
            mostrarProductosEditables();
            mostrarInventario();
        }
    }
}

// Función para eliminar producto
function eliminarProducto(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        productos = productos.filter(p => p.id !== id);
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductosEditables();
        mostrarInventario();
    }
}