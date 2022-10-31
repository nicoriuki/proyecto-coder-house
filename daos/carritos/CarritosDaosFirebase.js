import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';
import ProductosDaosFirebase from '../productos/ProductosDaosFirebase.js';
const prodControl = new ProductosDaosFirebase();

class CarritosDaosFirebase extends ContenedorFirebase {
      constructor() {
            super('carritos');
      }
      /*Metodo para nuevo carrito*/
      async newCart() {
            try {
                  let cart = {};
                  cart['timestamp'] = new Date().toLocaleString();
                  cart['productos'] = [];
                  this.postItem(cart);
                  return cart['_id'];
            } catch (error) {
                  console.log('[newCart] CarritosDaosFirebase', error.message);
            }
      }
      /*Metodo para agregar producto en el carrito*/
      async newProductCart(idCart, idProduct) {
            try {
                  let productos = [];
                  const product = await prodControl.getById(idProduct);
                  let cart = await this.getById(idCart);
                  productos = [...cart.productos, product];
                  cart = {
                        ...cart,
                        productos: productos,
                  };
                  await this.putItem(idCart, cart);
            } catch (error) {
                  console.log(
                        '[newProductCart CarritosDaosFirebase]',
                        error.message
                  );
            }
      }
      /*Metodo para obtener los productos del carrito*/
      async getByIdProduct(id) {
            try {
                  const data = await this.getAll();
                  const cartId = data.filter((item) => item._id === id);
                  if (cartId.length === 0) {
                        throw new Error('No se encontro el ID');
                  } else {
                        let response = [];
                        cartId[0].productos.map((item) => {
                              response.push(item);
                        });
                        return response;
                  }
            } catch (error) {
                  console.log(
                        '[getByIdProduct CarritosDaosFirebase]',
                        error.message
                  );
            }
      }
      /*Metodo para eliminar los productos del carrito*/
      async deleteProductById(idCart, idProduct) {
            try {
                  const cart = await this.getById(idCart);
                  let response = cart.productos.find(
                        (item) => item._id === idProduct
                  );
                  if (!response) return;
                  cart.productos = cart.productos.filter(
                        (item) => item._id !== idProduct
                  );
                  await this.putItem(idCart, cart);
            } catch (error) {
                  console.log(
                        '[deleteProductById CarritosDaosFirebase]',
                        error.message
                  );
            }
      }
}

export default CarritosDaosFirebase;
