import FirebaseAdmin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

const data = {
      type: process.env.FIRE_TYPE,
      project_id: process.env.FIRE_PROJECT_ID,
      private_key_id: process.env.FIRE_PRIVATE_KEY_ID,
      private_key: process.env.FIRE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIRE_CLIENT_EMAIL,
      client_id: process.env.FIRE_CLIENT_ID,
      auth_uri: process.env.FIRE_AUTH_URI,
      token_uri: process.env.FIRE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIRE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIRE_CLIENT_X509_CERT_URL,
};

const connect = async () => {
      try {
            FirebaseAdmin.initializeApp({
                  credential: FirebaseAdmin.credential.cert(data),
            });
            console.log('Conectado a la base de datos Firebase');
      } catch (error) {
            console.log('[connect ContenedorFirebase]', error.message);
      }
};
await connect();
class ContenedorFirebase {
      constructor(collection) {
            this.collection = collection;
            this.db = FirebaseAdmin.firestore();
            this.query = this.db.collection(this.collection);
      }
      async getAll() {
            try {
                  const querySnapshot = await this.query.get();
                  let docs = querySnapshot.docs;
                  const response = docs.map((doc) => ({
                        _id: doc.id,
                        ...doc.data(),
                  }));
                  return response;
            } catch (error) {
                  console.error('[getAll] ContenedorFirebase', error.message);
            }
      }
      /*Metodo para obtener Item por id*/
      async getById(id) {
            try {
                  const doc = this.query.doc(id);
                  const item = await doc.get();
                  const response = item.data();
                  if (response) {
                        response['_id'] = id;
                        return response;
                  } else {
                        throw new Error('No se encontro el ID');
                  }
            } catch (error) {
                  console.error('[getById] ContenedorFirebase', error.message);
            }
      }
      /*Metodo para Guardar */
      async postItem(content) {
            try {
                  let id = uuidv4();
                  let doc = this.query.doc(id);
                  await doc.create(content);
                  return content.id;
            } catch (error) {
                  console.log('[postItem] ContenedorFirebase]', error.message);
            }
      }
      /*Metodo para Modificar */
      async putItem(id, content) {
            try {
                  const doc = this.query.doc(id);
                  await doc.update(content);
                  return content._id;
            } catch (error) {
                  console.log('[putItem ContenedorFirebase]', error.message);
            }
      }
      /*Metodo para Eliminar */
      async deleteItem(id) {
            try {
                  const doc = this.query.doc(id);
                  await doc.delete();
            } catch (error) {
                  console.log('[deleteItem ContenedorFirebase]', error.message);
            }
      }
}
export default ContenedorFirebase;
