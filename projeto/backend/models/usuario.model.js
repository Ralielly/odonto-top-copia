import { db } from "../database/db.js";

class UsuarioModel {

  static async buscarPorUsuario(usuario) {
    try {
      const query = "SELECT * FROM usuarios WHERE usuario = $1;";
      const resultado = await db.query(query, [usuario]);
      return resultado.rows[0]; // Retorna o primeiro usuário encontrado ou undefined
    } catch (error) {
      throw error;
    }
  }

  static async criarUsuario(nome, usuario, senha) {
    try {
      const query = `
        INSERT INTO usuarios (nome, usuario, senha) 
        VALUES ($1, $2, $3) 
        RETURNING *;
      `;
      const resultado = await db.query(query, [nome, usuario, senha]);
      return resultado.rows[0];
    } catch (error) {
      throw error;
    }
  }

}

export default UsuarioModel;