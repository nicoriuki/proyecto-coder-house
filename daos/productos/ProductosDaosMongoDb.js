import ProductosModel from '../../model/productos.js';
import ContenedorMongoDb from './../../contenedores/ContenedorMongoDb.js';

class ProductosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(ProductosModel);
      }
      /*Metodo para Crear un nuevo Producto */
      async newProduct(product) {
            try {
                  product['timestamp'] = new Date().toLocaleString();
                  await this.postItem(product);
            } catch (error) {
                  console.log(
                        '[newProduct] ProductosDaosMongoDb',
                        error.message
                  );
            }
      }
}
export default ProductosDaosMongoDb;
