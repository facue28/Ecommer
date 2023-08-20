import productosDisponibles from '../data/bbdd.js'  
import { renderCarrito, buttonResta, buttonSuma } from './functions.js';
document.addEventListener("DOMContentLoaded", () => {

        if (localStorage.carrito){
            renderCarrito();
        }
    });