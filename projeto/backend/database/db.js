import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Teste opcional de conexão ao iniciar
db.connect()
  .then(() => console.log("Conectado ao banco de dados com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));