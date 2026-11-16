// Importa Sequelize: librería ORM que nos permite trabajar con la base de datos usando JavaScript
import { Sequelize } from 'sequelize';
// Importa dotenv para leer el archivo .env
import dotenv from 'dotenv';

// Carga el .env en process.env. index.ts ya lo hace, pero lo dejamos aquí
// por si este archivo se usa solo (por ejemplo, en un script de migraciones).
dotenv.config();

// Lee la cadena de conexión a PostgreSQL desde la variable DATABASE_URL del .env.
// Formato típico: postgres://usuario:clave@host:5432/nombre_base
// Si la variable no existe, queda '' (texto vacío) y la conexión va a fallar.
const DATABASE_URL = process.env.DATABASE_URL || '';

// Crea la instancia de conexión con la base de datos.
// Todavía no se conecta de forma real: la conexión se abre cuando hacemos la primera consulta.
const sequelize = new Sequelize(DATABASE_URL, {
  // Le indicamos a Sequelize que la base de datos es PostgreSQL
  dialect: 'postgres',
  // false = no mostrar en consola las consultas SQL que Sequelize ejecuta.
  // Ponelo en true cuando quieras ver el SQL generado mientras depurás.
  logging: false,
});

// Función que prueba la conexión con la base de datos.
// Es "async" porque conectarse toma tiempo: usamos "await" para esperar el resultado.
export async function connectDatabase(): Promise<void> {
  try {
    // authenticate() intenta conectarse y verificar usuario y contraseña
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    // Si falla, mostramos el error y cortamos el proceso.
    // El código 1 indica a la terminal que el programa terminó con error.
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

// Exporta la conexión para que otros módulos la importen y hagan consultas con ella
export default sequelize;
