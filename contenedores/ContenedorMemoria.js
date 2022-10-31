class ContenedorMemoria {
      constructor(items) {
            this.items = items;
      }
      /*Metodo para obtener todos los Item */
      async getAll() {
            try {
                  let data = [...this.items];
                  return data;
            } catch (error) {
                  console.log('[getAll] ContenedorMemoria', error.message);
            }
      }
      /*Metodo para obtener Item por id*/
      async getById(id) {
            try {
                  const data = await this.items.find((item) => item._id == id);
                  if (!data) {
                        throw new Error(`Error: Id no encontrado`);
                  } else {
                        return data;
                  }
            } catch (error) {
                  console.log('[getById] ContenedorMemoria', error.message);
            }
      }
      /*Metodo para Guardar */

      async postItem(content) {
            try {
                  await this.items.push(content);
                  return content;
            } catch (error) {
                  console.log('[postItem] ContenedorMemoria', error.message);
            }
      }
      /*Metodo para Modificar */

      async putItem(id, content) {
            try {
                  let data = await this.items;
                  let result = data.find((item) => item._id === id);
                  if (result.length === 0) {
                        throw new Error('No se encontro el ID');
                  } else {
                        data = data.filter((item) => item._id !== id);
                        data.push(content);
                        this.items = data;
                        return content._id;
                  }
            } catch (error) {
                  console.log('[putItem] ContenedorMemoria', error.message);
            }
      }
      /*Metodo para Eliminar */
      async deleteItem(id) {
            try {
                  let data = await this.items;
                  if (data.find((item) => item._id === id)) {
                        const newContent = data.filter(
                              (item) => item._id !== id
                        );
                        this.items = newContent;
                        return id;
                  } else {
                        throw new Error(`no se encontro  el id ${id}`);
                  }
            } catch (error) {
                  console.log('[deleteItem] ContenedorMemoria', error.message);
            }
      }
}

export default ContenedorMemoria;
