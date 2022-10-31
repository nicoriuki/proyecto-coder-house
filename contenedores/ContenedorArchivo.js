import fs from 'fs';
class ContenedorArchivo {
      constructor(file) {
            this.file = file;
      }
      /*Metodo para obtener todos los Item */
      async getAll() {
            try {
                  const data = await fs.readFileSync(this.file, 'utf-8');
                  return JSON.parse(data);
            } catch (error) {
                  console.log('[getAll ContenedorArchivo]', error.message);
            }
      }
      /*Metodo para obtener Item por id*/
      async getById(id) {
            try {
                  const data = await this.getAll();
                  const result = data.find((item) => item._id === id);
                  if (!result) {
                        throw new Error(` no se encontro  el id ${id} `);
                  } else {
                        return result;
                  }
            } catch (error) {
                  console.log('[getById] ContenedorArchivo', error.message);
            }
      }
      /*Metodo para Guardar */
      async postItem(content) {
            try {
                  const data = await this.getAll();
                  data.push(content);
                  fs.writeFileSync(
                        this.file,
                        JSON.stringify(data, null, 2),
                        'utf-8'
                  );
                  return content.id;
            } catch (error) {
                  console.log('[postItem] ContenedorArchivo', error.message);
            }
      }
      /*Metodo para Modificar */
      async putItem(id, content) {
            try {
                  let data = await this.getAll();
                  let result = data.find((item) => item._id === id);
                  if (result.length === 0) {
                        throw new Error(`no se encontro  el id ${id} `);
                  } else {
                        data = data.filter((item) => item._id !== id);
                        data.push(content);
                        fs.writeFileSync(
                              this.file,
                              JSON.stringify(data, null, 2),
                              'utf-8'
                        );
                        return content._id;
                  }
            } catch (error) {
                  console.log('[putItem] ContenedorArchivo', error.message);
            }
      }
      /*Metodo para Eliminar */
      async deleteItem(id) {
            try {
                  const data = await this.getAll();
                  if (data.find((item) => item._id === id)) {
                        const newContent = data.filter(
                              (item) => item._id !== id
                        );
                        fs.writeFileSync(
                              this.file,
                              JSON.stringify(newContent, null, 2),
                              'utf-8'
                        );
                        return id;
                  } else {
                        throw new Error(` no se encontro  el id ${id} `);
                  }
            } catch (error) {
                  console.log('[deleteItem] ContenedorArchivo', error.message);
            }
      }
}
export default ContenedorArchivo;
