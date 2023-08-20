import productosDisponibles from '../data/bbdd.js'
let carrito = [1]
// Seleccion de nodos
const contenedor = document.querySelector("#container-productos");
const buttonCompra = document.querySelectorAll(".buttonCompra");
const buttonFilter = document.querySelectorAll(".buttonFilter");
const tableCarrito = document.querySelector("#carritoRow");
const buttonsResta = document.querySelectorAll(".buttonResta");
const cantidadSpan = document.querySelectorAll(".cantidad-span")
const buttonsSuma = document.querySelectorAll(".buttonSuma");

/// Function Add Event buttonCompra
const addEventbuttonCompra = () => {
    const buttonCompra = document.querySelectorAll(".buttonCompra");
    buttonCompra.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = parseInt(event.target.getAttribute("id"));
            const productFind = productosDisponibles.find((producto) => producto.id === productId);
            if (productFind) {
                if (!localStorage.carrito) {
                    localStorage.setItem("carrito", JSON.stringify([{ ...productFind, cantidad: 1 }]));
                } else {
                    const carrito = JSON.parse(localStorage.carrito)
                    const existeEnCarrito = carrito.find(element => element.id === productFind.id);
                    if (existeEnCarrito) {
                        carrito.map(element => {
                            if (element.id === existeEnCarrito.id) {
                                existeEnCarrito.cantidad++
                            } return element
                        })
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                    } else {
                        carrito.push({ ...productFind, cantidad: 1 });
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                    }
                }
            }
        });
    });
}



/// Function productFilter 
const productFilter = () => {
    buttonFilter.forEach((button) => {
        button.addEventListener("click", (event) => {
            const catProduct = event.target.getAttribute("id");
            let catFind;
            if (catProduct === "verTodo") {
                catFind = productosDisponibles;
            } else {
                catFind = productosDisponibles.filter((producto) => producto.categoria === catProduct);
            }
            ///Limpiar contenedor
            contenedor.innerHTML = ``;
            catFind.forEach((producto) => {
                const div = document.createElement("div");
                div.classList.add("card", "m-3")
                div.style.width = "18rem"
                div.innerHTML =
                    `
                    <img src=${producto.imagen} class="card-img-top">
                    <div class="card-body" id = ${producto.id}>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: ${producto.precio}.</p>
                        <a href="#" class="btn btn-primary buttonCompra" id = ${producto.id}>Agregar al carrito</a>
                    </div>
                    `
                contenedor.appendChild(div)
            });
        })
    })
}


/// Function renderCarrito 
const renderCarrito = () => {
    tableCarrito.innerHTML = "";
    JSON.parse(localStorage.carrito).forEach(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                        <th id=${producto.id} scope="row">${producto.id}</th>
                        <td>${producto.nombre}</td>
                        <td>$ ${producto.precio}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-sm buttonResta" id=${producto.id}> - </button>
                                <span id=${producto.id} class='cantidad-span'>${producto.cantidad}</span>
                            <button type="button" class="btn btn-primary btn-sm buttonSuma" id=${producto.id}> + </button>
                        </td>
                        <td>$ ${producto.cantidad * producto.precio}</td>
                    `
        tableCarrito.appendChild(tr);
    });
}


/// Function buttonResta 
const buttonResta = () => {
    buttonsResta.forEach((button) => {
        button.addEventListener("click", (event) => {
            const buttonId = parseInt(event.target.getAttribute("id"));
            const carrito = JSON.parse(localStorage.carrito)
            carrito.map(element => {
                if (element.id === buttonId) {
                    element.cantidad--
                    cantidadSpan.forEach(span => {
                        const spanId = parseInt(span.getAttribute("id"));
                        if (spanId == buttonId) {
                            span.innerText = element.cantidad
                        }
                    })
                } return element
            })
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    })
}


/// Function buttonSuma
const buttonSuma = () => {
    buttonsSuma.forEach((button) => {
        button.addEventListener("click", (event) => {
            const buttonId = parseInt(event.target.getAttribute("id"));
            const carrito = JSON.parse(localStorage.carrito)
            carrito.map(element => {
                if (element.id === buttonId) {
                    element.cantidad++
                    cantidadSpan.forEach(span => {
                        const spanId = parseInt(span.getAttribute("id"));
                        if (spanId == buttonId) {
                            span.innerText = element.cantidad
                        }
                    })
                } return element
            })
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    })
}




export {addEventbuttonCompra, renderCarrito, buttonResta, buttonSuma, productFilter }