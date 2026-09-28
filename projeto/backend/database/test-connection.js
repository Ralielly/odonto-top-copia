import "dotenv/config";
import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

try {
  await client.connect();

  console.log("✅ CONEXÃO COM O POSTGRESQL FUNCIONOU!");

  const resultado = await client.query("SELECT NOW()");

  console.log("Horário do banco:", resultado.rows[0]);

  await client.end();
} catch (error) {
  console.error("❌ ERRO AO CONECTAR:");
  console.error(error);
}