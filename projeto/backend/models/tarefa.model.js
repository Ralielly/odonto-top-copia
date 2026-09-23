import { db } from "../database/db.js";

class TarefaModel {
  static async listarTodas() {
    try {
      const resultado = await db.query("SELECT * FROM tarefas ORDER BY id;");
      return resultado.rows;
    } catch (error) {
      throw error;
    }
  }

  static async criarTarefa(dadosTarefa) {
    try {
      const { titulo } = dadosTarefa;
      const query = "INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *;";
      const resultado = await db.query(query, [titulo]);
      return resultado.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async excluirTarefa(id) {
    try {
      const query = "DELETE FROM tarefas WHERE id = $1;";
      await db.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }
}

export default TarefaModel;