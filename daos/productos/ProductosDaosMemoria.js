import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';
import products from '../../DB/productosMemoria.js';
import { v4 as uuidv4 } from 'uuid';
class ProductosDaoMemoria extends ContenedorMemoria {
      constructor() {
            super(products);
      }
      /*Metodo para Crear un nuevo Producto */
      async newProduct(product) {
            try {
                  product['_id'] = uuidv4();
                  product['timestamp'] = new Date().toLocaleString();
                  await this.postItem(product);
            } catch (error) {
                  console.log('[newProduct] ProductosDaoMem', error.message);
            }
      }
}

export default ProductosDaoMemoria;
