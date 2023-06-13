// 1) Realizar una funcion que reciba un numero y escriba una piramide desde 1 hasta ese numero de la siguiente forma:
// para valor 6 y valor 3

function generarPiramide(numero) {
    for (let i = 1; i <= numero; i++) {
      let fila = '';
      for (let j = 1; j <= i; j++) {
        fila += j;
      }
      console.log(fila);
    }
}
generarPiramide(6);
generarPiramide(3);


//2) Escribir una funcion que reciba 2 array y devuelva un array con todos los elementos que coinciden entre ellos
let array1 = [1,2,3,4,5,6,7,8,9];
let array2 = [1,2,3,7,8,9];
function buscarIguales(array1, array2) {
    return array1.filter(elemento => array2.includes(elemento));
}
let array3 = buscarIguales(array1,array2)
console.log(array3);

// 3)
// 3.1) Dado el siguiente objeto crear las clases necesarias para generar carritos respetando la estructura del objeto dado.
//3.2) Agregar un metodo a la clase que agregue un producto al carrito y actualice el montoTotal
//3.3)Agregar al ejercicio anterior una validación para no permitir duplicados e imprimir un mensaje si el item ya existe “ya existe xxx con yyy unidades”


class Producto {
    constructor(nombre, precio, unidades) {
      this.nombre = nombre;
      this.precio = precio;
      this.unidades = unidades;
    }
}
class Carrito {
    constructor() {
      this.montoTotal = 0;
      this.productos = [];
    }
  
    agregarProducto(nombre, precio, unidades) {
      const productoExistente = this.productos.find(
        (producto) => producto.nombre === nombre
      );
  
      if (productoExistente) {
        console.log(
          `El producto "${nombre}" ya existe con ${productoExistente.unidades} unidades.`
        );
      } else {
        const nuevoProducto = new Producto(nombre, precio, unidades);
        this.productos.push(nuevoProducto);
        this.montoTotal += precio * unidades;
      }
    }
}

let carrito = new Carrito();
carrito.agregarProducto("Azucar", 5, 2);
carrito.agregarProducto("Leche", 5, 2);


console.log(carrito.montoTotal); 
console.log(carrito.productos);