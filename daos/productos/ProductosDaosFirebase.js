import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

class ProductosDaosFirebase extends ContenedorFirebase {
      constructor() {
            super('productos');
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

export default ProductosDaosFirebase;
