
/*
En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar
​
Ejercicios
​
2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    e) La función debe retornar una promesa
​
3) Utilizar la función eliminarProducto utilizando .then() y .catch()
​
*/


// Cada producto que vende el super es creado con esta clase

class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}


// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);



// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) { 
        try {
            // Busco el producto en la "base de datos"
            const producto = await findProductBySku(sku);
            console.log(`Buscando ${cantidad} de ${sku}`);
            console.log("Producto encontrado", producto.nombre)
            
            // Creo un producto nuevo
            const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);

            //Busca si el producto esta repetido
            const productoRepetido = this.productos.find(e => e.nombre === nuevoProducto.nombre)

            //Busca si la categoria esta repetido
            const categoriaRepetida = this.categorias.find(e => e === producto.categoria)

            //Agrega si es necesario una categoria
            !categoriaRepetida ? this.categorias.push(producto.categoria) : null ;

            //Agrega un producto o actualiza uno ya existente 
            if (productoRepetido) {
                productoRepetido.cantidad = (productoRepetido.cantidad + cantidad)
                this.precioTotal = this.precioTotal + (producto.precio * cantidad);
                console.log("Se actualizo la cantidad de "+productoRepetido.nombre);             
            }else{
                this.productos.push(nuevoProducto);
                this.precioTotal = this.precioTotal + (producto.precio * cantidad);
                console.log("Producto agregado");
            }        
            
        } catch (error) {
            console.log("Lo sentimos no tenemos en stock el producto con el código de referencia "+sku);
        }
    }

    eliminarProducto(sku, cantidad) {
        
        
        return new Promise((resolve,reject) =>{
            setTimeout(() =>{

                console.log(`Buscando dentro del carrito el producto con sku ${sku} para sacar ${cantidad} unidades`);
                //Busca dentro del arreglo un elemento
                const e = this.productos.find(e => e.sku === sku)        

                if (e) {
                    //Si existe se resta la cantidad y si es menor a 1 la cantidad se elimina
                    e.cantidad = (e.cantidad - cantidad)
                    if (e.cantidad >= 1) {
                        
                        resolve(`Se elimino ${cantidad} del producto con sku ${sku}`)
                    }else{
                        this.productos = this.productos.filter(e => e.sku != sku)
                        console.log(this.productos);
                        resolve(`Se elimino el producto con sku ${sku} del carrito`)
                    }
                    
                    
                }else{
                    reject("Este producto no se encuentra dentro del carrito")
                }
                
            },2000)
        })
    }

    
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1000);
    });
}



const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('OL883YE', 2);
carrito.agregarProducto('RT324GD', 2);
carrito.agregarProducto('aw', 2);
carrito.agregarProducto('RT324GD', 2);

const eliminarPromesa = carrito.eliminarProducto("WE328NJ",4)




eliminarPromesa.then((mensaje) => {
    console.log(mensaje);
})
.catch(mensaje => {
    console.log(mensaje);
})









