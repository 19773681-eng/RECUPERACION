// CATÁLOGO DE PRODUCTOS
const productos = [
    {
        id: 1,
        nombre: "Laptop",
        precio: 650.00,
        imagen: "💻"
    },
    {
        id: 2,
        nombre: "Audífonos",
        precio: 35.00,
        imagen: "🎧"
    },
    {
        id: 3,
        nombre: "Teclado Gamer",
        precio: 45.00,
        imagen: "⌨️"
    },
    {
        id: 4,
        nombre: "Celular",
        precio: 350.00,
        imagen: "📱"
    },
    {
        id: 5,
        nombre: "Mouse",
        precio: 20.00,
        imagen: "🖱️"
    },
    {
        id: 6,
        nombre: "Monitor",
        precio: 180.00,
        imagen: "🖥️"
    }
];

// CARRITO DE COMPRAS
let carrito = [];

// ELEMENTOS HTML
const listaProductos = document.getElementById("listaProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalElemento = document.getElementById("total");
const buscador = document.getElementById("buscador");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");
const mensajeCompra = document.getElementById("mensajeCompra");
const btnComprar = document.getElementById("btnComprar");

// MOSTRAR PRODUCTOS
function mostrarProductos(lista = productos) {
    listaProductos.innerHTML = "";

    if (lista.length === 0) {
        listaProductos.textContent = "No se encontraron productos.";
        return;
    }

    lista.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        const imagen = document.createElement("div");
        imagen.className = "imagen";
        imagen.textContent = producto.imagen;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.className = "precio";
        precio.textContent = `$${producto.precio.toFixed(2)}`;

        const boton = document.createElement("button");
        boton.className = "btn-agregar";
        boton.textContent = "Agregar al carrito";
        boton.addEventListener("click", () => agregarCarrito(producto.id));

        tarjeta.append(imagen, nombre, precio, boton);
        listaProductos.appendChild(tarjeta);
    });
}

// AGREGAR PRODUCTOS AL CARRITO
function agregarCarrito(id) {
    const producto = productos.find(item => item.id === id);

    if (!producto) {
    mensajeCompra.textContent =
        "No se pudo agregar el producto. Inténtalo nuevamente.";

    mensajeCompra.className = "mensaje error";
    return;
}

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    mensajeCompra.textContent = "";
    actualizarCarrito();
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.textContent = "Tu carrito está vacío.";
    }

    carrito.forEach(producto => {
        const elemento = document.createElement("div");
        elemento.className = "item-carrito";

        const informacion = document.createElement("span");
        informacion.textContent =
            `${producto.nombre} x ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;

        const boton = document.createElement("button");
        boton.className = "btn-eliminar";
        boton.textContent = "Eliminar";
        boton.addEventListener("click", () => eliminarProducto(producto.id));

        elemento.append(informacion, boton);
        listaCarrito.appendChild(elemento);
    });

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );

    totalElemento.textContent = total.toFixed(2);
}

// ELIMINAR PRODUCTOS
function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
}

// BUSCADOR DE PRODUCTOS
buscador.addEventListener("input", () => {
    const busqueda = buscador.value.trim().toLowerCase();

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    );

    mensajeBusqueda.textContent = resultados.length === 0
        ? "No hay resultados para tu búsqueda."
        : "";

    mostrarProductos(resultados);
});

// FINALIZAR COMPRA
btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        mensajeCompra.textContent =
            "Error: agrega al menos un producto antes de comprar.";

        mensajeCompra.className = "mensaje error";
        return;
    }

    carrito = [];
    actualizarCarrito();

    mensajeCompra.textContent =
        "¡Compra realizada correctamente! Gracias por visitar TechStore.";

    mensajeCompra.className = "mensaje exito";
});

// INICIAR TIENDA
mostrarProductos();
actualizarCarrito();