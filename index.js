import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import apiRouters from './routers/api/index.js';

const app = express();

const PORT = process.env.NODE_PORT;
const ENV = process.env.NODE_ENV;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouters);

// Middleware de manejo de errores
app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500).send('Something broke!');
});
/*Middleware peticon a otra pagina */
app.use((req, res) => {
      res.status(404).json({
            error: -2,
            descripcion: `ruta: ${req.originalUrl} `,
            método: req.method,
            estado: 'no implementada',
      });
});
const server = app.listen(PORT, () => {
      console.log(
            `Servidor http esta escuchando en el puerto ${
                  server.address().port
            }`
      );
      console.log(`http://localhost:${server.address().port}`);
      console.log(`Environment:${ENV}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
