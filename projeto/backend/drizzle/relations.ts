import { relations } from "drizzle-orm/relations";
import { pessoa, paciente, consulta, pagamento, cargo, funcionario, consultaProcedimento, procedimento } from "./schema";

export const pacienteRelations = relations(paciente, ({one, many}) => ({
	pessoa: one(pessoa, {
		fields: [paciente.idPessoaPaciente],
		references: [pessoa.idPessoa]
	}),
	consultas: many(consulta),
}));

export const pessoaRelations = relations(pessoa, ({many}) => ({
	pacientes: many(paciente),
	funcionarios: many(funcionario),
}));

export const pagamentoRelations = relations(pagamento, ({one}) => ({
	consulta: one(consulta, {
		fields: [pagamento.idPagamentoConsulta],
		references: [consulta.idConsulta]
	}),
}));

export const consultaRelations = relations(consulta, ({one, many}) => ({
	pagamentos: many(pagamento),
	consultaProcedimentos: many(consultaProcedimento),
	funcionario: one(funcionario, {
		fields: [consulta.idFuncionarioConsulta],
		references: [funcionario.idFuncionario]
	}),
	paciente: one(paciente, {
		fields: [consulta.idPacienteConsulta],
		references: [paciente.idPaciente]
	}),
}));

export const funcionarioRelations = relations(funcionario, ({one, many}) => ({
	cargo: one(cargo, {
		fields: [funcionario.idCargoFuncionario],
		references: [cargo.idCargo]
	}),
	pessoa: one(pessoa, {
		fields: [funcionario.idPessoaFuncionario],
		references: [pessoa.idPessoa]
	}),
	consultas: many(consulta),
}));

export const cargoRelations = relations(cargo, ({many}) => ({
	funcionarios: many(funcionario),
}));

export const consultaProcedimentoRelations = relations(consultaProcedimento, ({one}) => ({
	consulta: one(consulta, {
		fields: [consultaProcedimento.idConsulProc],
		references: [consulta.idConsulta]
	}),
	procedimento: one(procedimento, {
		fields: [consultaProcedimento.idProcConsul],
		references: [procedimento.idProcedimento]
	}),
}));

export const procedimentoRelations = relations(procedimento, ({many}) => ({
	consultaProcedimentos: many(consultaProcedimento),
}));