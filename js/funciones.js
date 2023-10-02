const guardarproductosLS = (productos) => {
  localStorage.setItem("productos", JSON.stringify(productos));
}
const cargarproductosLS = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
}


const renderproductos = () => {
  const productos = cargarproductosLS();
  let contenidoHTML = "";

  productos.forEach(producto => {
    contenidoHTML += `<div class="cold-md-6 mb-5 text-center" >
        <div class"card">
        <img src="${producto.img}"class="rounded" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn btn-primary" onclick ="agregarProductoCarrito(${producto.id})"> Agregar (+)</a>
        </div>
      </div>
      </div> `;
  });

  document.getElementById("Productos").innerHTML = contenidoHTML;

}

const renderCarrito = () => {
  const productos = cargarCarritoLS();
  let contenidoHTML;

  if (cantProductosCarrito() > 0) {
    contenidoHTML = `<table class="table table-hover >
      <tr>
      <td colspan="7" class="text-end"><button class="btn" onclick="vaciarCarrito()" title="Vaciar Carrito">Vaciar Carrito [x]</button></td>
      </tr>`;

    productos.forEach(producto => {
      contenidoHTML += `<tr>
          <td><img src="${producto.img}" alt="${producto.nombre}" width="64"></td>
          <td class="align-middle">${producto.nombre}</td>
          <td class="align-middle">$${producto.precio}</td>
          <td class="align-middle"><button class="btn  rounded-circle" onclick="decrementarCantidadProducto(${producto.id})">-</button> ${producto.cantidad} <button class="btn rounded-circle" onclick="incrementarCantidadProducto(${producto.id})">+</button></td>
          <td class="align-middle">$${producto.precio * producto.cantidad}</td>
          <td class="align-middle text-end"><img src="img/trash3.svg" alt="Eliminar" width="24" onclick="eliminarProductoCarrito(${producto.id})"></td>
          </tr>`;
    });

    contenidoHTML += `<tr>
      <td colspan="4">Total</td>
      <td><b>$${sumaProductosCarrito()}</b></td>
      </tr>
      </table>`;
  } else {
    contenidoHTML = `<div class="alert alert-warning my-5 text-center" role="alert">No se encontaron Productos en el Carrito!</div>`;
  }

  document.getElementById("Productos").innerHTML = contenidoHTML;
}


const guardarCarritoLS = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarCarritoLS = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

const guardarProductoLS = (id) => {
  localStorage.setItem("producto", JSON.stringify(id));
}

const cargarProductoLS = () => {
  return JSON.parse(localStorage.getItem("producto")) || [];
}



const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  renderCarrito();
  renderBotonCarrito();
}

const agregarProductoCarrito = (id) => {
  const carrito = cargarCarritoLS();

  if (estaEnElCarrito(id)) {
    const producto = carrito.find(item => item.id === id);
    producto.cantidad += 1;
  } else {
    const producto = buscarProducto(id);
    producto.cantidad = 1;
    carrito.push(producto);
  }

  guardarCarritoLS(carrito);
  renderBotonCarrito();
}

const eliminarProductoCarrito = (id) => {
  const carrito = cargarCarritoLS();
  const nuevoCarrito = carrito.filter(item => item.id !== id);
  guardarCarritoLS(nuevoCarrito);
  renderCarrito();
  renderBotonCarrito();
}

const incrementarCantidadProducto = (id) => {
  const carrito = cargarCarritoLS();
  const producto = carrito.find(item => item.id === id);
  producto.cantidad += 1;
  guardarCarritoLS(carrito);
  renderCarrito();
  renderBotonCarrito();
}

const decrementarCantidadProducto = (id) => {
  const carrito = cargarCarritoLS();
  const producto = carrito.find(item => item.id === id);

  if (producto.cantidad > 1) {
    producto.cantidad -= 1;
    guardarCarritoLS(carrito);
    renderCarrito();
    renderBotonCarrito();
  } else {
    eliminarProductoCarrito(id);
  }
}

const buscarProducto = (id) => {
  const productos = cargarproductosLS();
  let producto = productos.find(item => item.id === id);

  return producto;
}

const estaEnElCarrito = (id) => {
  const productos = cargarCarritoLS();

  return productos.some(item => item.id === id);
}

const cantProductosCarrito = () => {
  const carrito = cargarCarritoLS();

  return carrito.reduce((acc, item) => acc += item.cantidad, 0);
}

const sumaProductosCarrito = () => {
  const carrito = cargarCarritoLS();

  return carrito.reduce((acc, item) => acc += item.precio * item.cantidad, 0);
}

const renderBotonCarrito = () => {
  let totalCarrito = document.getElementById("totalCarrito");
  totalCarrito.innerHTML = cantProductosCarrito();
}
