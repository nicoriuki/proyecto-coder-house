let Carrito;
let Producto;
switch (process.env.BD_SELECCIONADA) {
      case 'archivo':
            const { default: CarritosDaosArchivo } = await import(
                  './carritos/CarritosDaosArchivo.js'
            );
            const { default: ProductosDaosArchivo } = await import(
                  './productos/ProductosDaosArchivos.js'
            );
            Producto = new ProductosDaosArchivo();
            Carrito = new CarritosDaosArchivo();
            break;
      case 'mongodb':
            const { default: CarritosDaosMongoDb } = await import(
                  './carritos/CarritosDaosMongoDb.js'
            );
            Carrito = new CarritosDaosMongoDb();
            const { default: ProductosDaosMongoDb } = await import(
                  './productos/ProductosDaosMongoDb.js'
            );
            Producto = new ProductosDaosMongoDb();
            await Carrito.connect();
            break;
      case 'firebase':
            console.log('firebase');
            const { default: CarritosDaosFirebase } = await import(
                  './carritos/CarritosDaosFirebase.js'
            );
            Carrito = new CarritosDaosFirebase();
            const { default: ProductosDaosFirebase } = await import(
                  './productos/ProductosDaosFirebase.js'
            );
            Producto = new ProductosDaosFirebase();
            break;
      default:
            const { default: CarritosDaosMemoria } = await import(
                  './carritos/CarritosDaosMemoria.js'
            );
            Carrito = new CarritosDaosMemoria();
            const { default: ProductosDaosMemoria } = await import(
                  './productos/ProductosDaosMemoria.js'
            );
            Producto = new ProductosDaosMemoria();
            break;
}
export { Carrito, Producto };
