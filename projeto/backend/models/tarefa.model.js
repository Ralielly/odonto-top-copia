import { db } from "../database/db.js";
import { tarefas } from "../database/schema.js"; // Certifique-se de que o caminho e o nome da tabela estão corretos
import { eq } from "drizzle-orm";

class TarefaModel {
  static async listarTodas() {
    try {
      // Equivalente a SELECT * FROM tarefas ORDER BY id;
      const resultado = await db
        .select()
        .from(tarefas)
        .orderBy(tarefas.id);
        
      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async criarTarefa(dadosTarefa) {
    try {
      const { titulo } = dadosTarefa;
      // Equivalente a INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *;
      const resultado = await db
        .insert(tarefas)
        .values({
          titulo,
        })
        .returning();
        
      return resultado[0];
    } catch (error) {
      throw error;
    }
  }

  static async excluirTarefa(id) {
    try {
      // Equivalente a DELETE FROM tarefas WHERE id = $1;
      await db
        .delete(tarefas)
        .where(eq(tarefas.id, id));
    } catch (error) {
      throw error;
    }
  }
}

export default TarefaModel;