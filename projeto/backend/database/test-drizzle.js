import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

const db = drizzle(pool);

try {
  const resultado = await db.execute("SELECT NOW()");

  console.log("✅ DRIZZLE FUNCIONANDO!");
  console.log("Resultado:", resultado);

  await pool.end();
} catch (error) {
  console.error("❌ ERRO NO DRIZZLE:");
  console.error(error);
}