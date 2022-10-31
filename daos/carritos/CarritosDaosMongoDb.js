import CarritosModelModel from '../../model/carritos.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
import ProductosDaosMongoDb from './../productos/ProductosDaosMongoDb.js';

const prodControl = new ProductosDaosMongoDb();
class CarritosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(CarritosModelModel);
      }
      /*Metodo para nuevo carrito*/
      async newCart() {
            try {
                  let cart = {};
                  cart['timestamp'] = new Date().toLocaleString();
                  cart['productos'] = [];
                  this.postItem(cart);
                  return cart['id'];
            } catch (error) {
                  console.log('[newCart] CarritosDaosMongoDb', error.message);
            }
      }
      /*Metodo para agregar producto en el carrito*/
      async newProductCart(idCart, idProduct) {
            try {
                  let productos;
                  let product = await prodControl.getById(idProduct);
                  let cart = await this.getById(idCart);
                  productos = [...cart.productos, product];
                  cart.productos = productos;
                  await this.putItem(idCart, cart);
            } catch (error) {
                  console.log(
                        '[newProductCart] CarritosDaosMongoDb',
                        error.message
                  );
            }
      }
      /*Metodo para obtener los productos del carrito*/
      async getByIdProduct(id) {
            try {
                  const data = await this.getById(id);
                  let response = [];
                  data.productos.map((item) => {
                        response.push(item);
                  });
                  return response;
            } catch (error) {
                  console.log(
                        '[getByIdProduct] CarritosDaosMongoDb',
                        error.message
                  );
            }
      }
      /*Metodo para eliminar los productos del carrito*/
      async deleteProductById(idCart, idProduct) {
            try {
                  const cart = await this.getById(idCart);
                  let result = cart.productos.find(
                        (item) => item._id.toString() === idProduct
                  );
                  if (!result) return;
                  cart.productos = cart.productos.filter(
                        (item) => item._id.toString() !== idProduct
                  );
                  await this.putItem(idCart, cart);
            } catch (error) {
                  console.log(
                        '[deleteProductById] CarritosDaosMongoDb',
                        error.message
                  );
            }
      }
}
export default CarritosDaosMongoDb;
