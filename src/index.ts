// Carga las variables del archivo .env (por ejemplo PORT o DATABASE_URL)
// dentro de process.env. Debe ir PRIMERO: los imports se ejecutan antes que
// cualquier otra línea, y los módulos que leen process.env necesitan que
// las variables ya estén cargadas.
import 'dotenv/config';

// Importa la aplicación de Express definida en app.ts
import app from './app.js';
// Importa la función que verifica la conexión a la base de datos
import { connectDatabase } from './config/database.js';

// process.env es un objeto con las variables de entorno del sistema.
// Si PORT no existe, usamos 3000 como valor por defecto (el || significa "o").
const PORT = process.env.PORT || 3000;

// Primero conectamos a la base. "await" espera a que termine antes de seguir.
// Si la conexión falla, connectDatabase() corta el proceso y el servidor no arranca.
await connectDatabase();

// Le pedimos a Express que escuche peticiones en ese puerto.
// El segundo parámetro es una función que se ejecuta cuando el servidor ya arrancó.
app.listen(PORT, () => {
  // Las comillas invertidas (`...`) permiten insertar variables con ${...}
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
