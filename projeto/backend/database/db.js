import pkg from 'pg';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema.js'; // 👈 1. Importe o schema aqui (ajuste o caminho se necessário)

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 👈 2. Passe o schema dentro de um objeto como segundo argumento
export const db = drizzle(pool, { schema });