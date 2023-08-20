import productosDisponibles from '../data/bbdd.js'  
import { renderCarrito,addEventbuttonCompra } from './functions.js';
document.addEventListener("DOMContentLoaded", () => {

        if (localStorage.carrito){
            renderCarrito()
        }
    });