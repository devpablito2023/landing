import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function createHistorialTable() {
  try {
    console.log("🔄 Creando tabla contactos_historial...");

    await db.query(`
      CREATE TABLE IF NOT EXISTS contactos_historial (
        id SERIAL PRIMARY KEY,
        contacto_id INTEGER REFERENCES contactos(id) ON DELETE CASCADE,
        estado_anterior VARCHAR(50),
        estado_nuevo VARCHAR(50),
        usuario VARCHAR(100),
        comentario TEXT,
        fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Tabla contactos_historial creada!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await db.end();
  }
}

createHistorialTable();
