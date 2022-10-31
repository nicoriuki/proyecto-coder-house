import ContenedorArchivo from './../../contenedores/ContenedorArchivo.js';
import { v4 as uuidv4 } from 'uuid';

class ProductosDaosArchivo extends ContenedorArchivo {
      constructor() {
            super('./DB/products.json');
      }
      /*Metodo para Crear un nuevo Producto */
      async newProduct(product) {
            try {
                  product['_id'] = uuidv4();
                  product['timestamp'] = new Date().toLocaleString();
                  await this.postItem(product);
            } catch (error) {
                  console.log(
                        '[newProduct ProductosDaosMongoDb]',
                        error.message
                  );
            }
      }
}
export default ProductosDaosArchivo;
