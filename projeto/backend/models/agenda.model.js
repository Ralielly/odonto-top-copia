import { db } from "../database/db.js";

class AgendaModel {

  static async listarConsultas() {
    try {
      const query = `
        SELECT 
          c.idConsulta,
          c.dataHora,
          c.tipo,
          c.status,
          -- Dados do Paciente e Pessoa
          json_build_object(
            'idPaciente', p.idPaciente,
            'pessoa', json_build_object('nomePessoa', pp.nomePessoa)
          ) AS paciente,
          -- Dados do Funcionário e Pessoa
          json_build_object(
            'idFuncionario', f.idFuncionario,
            'pessoa', json_build_object('nomePessoa', pf.nomePessoa)
          ) AS funcionario
        FROM consulta c
        LEFT JOIN paciente p ON c.idPacienteConsulta = p.idPaciente
        LEFT JOIN pessoa pp ON p.idPessoaPaciente = pp.idPessoa
        LEFT JOIN funcionario f ON c.idFuncionarioConsulta = f.idFuncionario
        LEFT JOIN pessoa pf ON f.idPessoaFuncionario = pf.idPessoa
        ORDER BY c.dataHora;
      `;

      const resultado = await db.query(query);
      return resultado.rows;
    } catch (error) {
      throw error;
    }
  }

}

export default AgendaModel;