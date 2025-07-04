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

async function fixDatabase() {
  try {
    console.log("🔄 Verificando y arreglando base de datos...");

    // Verificar estructura actual
    const currentStructure = await db.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'contactos'
      ORDER BY ordinal_position;
    `);

    console.log("📋 Estructura actual:");
    console.table(currentStructure.rows);

    // Agregar TODAS las columnas necesarias
    console.log("🔧 Agregando columnas faltantes...");

    await db.query(`
      ALTER TABLE contactos 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS respuesta TEXT,
      ADD COLUMN IF NOT EXISTS respondido_por VARCHAR(100),
      ADD COLUMN IF NOT EXISTS fecha_respuesta TIMESTAMP;
    `);

    // Si created_at no tiene valores, actualizarlos
    await db.query(`
      UPDATE contactos 
      SET created_at = CURRENT_TIMESTAMP 
      WHERE created_at IS NULL;
    `);

    // Crear función para trigger
    await db.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Crear trigger
    await db.query(`
      DROP TRIGGER IF EXISTS update_contactos_updated_at ON contactos;
      CREATE TRIGGER update_contactos_updated_at 
          BEFORE UPDATE ON contactos 
          FOR EACH ROW 
          EXECUTE FUNCTION update_updated_at_column();
    `);

    // Verificar estructura final
    const finalStructure = await db.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'contactos'
      ORDER BY ordinal_position;
    `);

    console.log("✅ Estructura final:");
    console.table(finalStructure.rows);

    // Probar consulta
    const testQuery = await db.query(`
      SELECT id, nombre, email, mensaje, estado, respuesta, 
             respondido_por, fecha_respuesta, created_at, updated_at
      FROM contactos 
      LIMIT 1;
    `);

    console.log("🧪 Prueba de consulta:");
    console.log(testQuery.rows[0]);

    console.log("🎉 Base de datos arreglada correctamente!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await db.end();
  }
}

fixDatabase();
