import { db } from "../database/db.js";
import { pessoa } from "../database/schema.js";
import { eq } from "drizzle-orm";

class UsuarioModel {

  static async buscarPorUsuario(emailOuUsuario) {
    try {
      // Buscando pelo email ou nome na tabela pessoa
      const resultado = await db
        .select()
        .from(pessoa)
        .where(eq(pessoa.email, emailOuUsuario));
        
      return resultado[0]; // Retorna o primeiro registro encontrado
    } catch (error) {
      throw error;
    }
  }

  static async criarUsuario(nomePessoa, email, telefone, cpfPessoa, senha) {
    try {
      const resultado = await db
        .insert(pessoa)
        .values({
          nomePessoa,
          email,
          telefone,
          cpfPessoa,
          tipo: "usuario",
          ativo: true
        })
        .returning();

      return resultado[0];
    } catch (error) {
      throw error;
    }
  }

}

export default UsuarioModel;