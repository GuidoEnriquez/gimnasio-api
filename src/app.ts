// Importa Express, el framework que usamos para crear el servidor web y las rutas
import express from 'express';

// Crea la aplicación. "app" es el objeto al que le agregamos middlewares y rutas
const app = express();

// Middleware: una función que se ejecuta antes de las rutas.
// express.json() lee el cuerpo (body) de las peticiones que vienen en formato JSON
// y lo convierte en un objeto de JavaScript disponible en req.body.
app.use(express.json());

// Ruta de prueba inicial: define qué responder cuando alguien hace GET a "/".
// req = la petición que llega; res = la respuesta que vamos a enviar.
app.get('/', (req, res) => {
  // res.json() convierte el objeto a JSON y lo envía con código 200 (OK)
  res.json({ message: 'API del gimnasio funcionando correctamente 🚀' });
});

// Exporta "app" para que otros archivos (como index.ts) puedan usarla
export default app;
