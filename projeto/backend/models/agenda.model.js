import { db } from "../database/db.js";
import { consulta } from "../database/schema.js";

class AgendaModel {

  static async listarConsultas() {
    try {
      // Usando select padrão do Drizzle para evitar erros de relacionamento no schema
      const resultado = await db.select().from(consulta);
      return resultado;
    } catch (error) {
      throw error;
    }
  }

}

export default AgendaModel;