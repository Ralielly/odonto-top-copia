import { pgTable, foreignKey, bigint, timestamp, varchar, date, numeric, unique, pgPolicy, uuid, text, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const paciente = pgTable("paciente", {
    idPaciente: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "paciente_idPaciente_seq", startWith: 1, increment: 1 }),
    idPessoaPaciente: bigint({ mode: "number" }).notNull(),
    dataCadastro: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
    planoDeSaude: varchar(),
    observacoes: varchar(),
}, (table) => [
    foreignKey({
            columns: [table.idPessoaPaciente],
            foreignColumns: [pessoa.idPessoa],
            name: "paciente_idPessoaPaciente_fkey"
        }).onUpdate("cascade").onDelete("cascade"),
]);

export const pagamento = pgTable("pagamento", {
    idPagamento: bigint({ mode: "number" }).primaryKey().notNull(),
    dataPagamento: date().notNull(),
    valor: numeric().notNull(),
    formaPagamento: varchar().notNull(),
    status: varchar().notNull(),
    idPagamentoConsulta: bigint({ mode: "number" }).notNull(),
}, (table) => [
    foreignKey({
            columns: [table.idPagamentoConsulta],
            foreignColumns: [consulta.idConsulta],
            name: "pagamento_idPagamentoConsulta_fkey"
        }).onUpdate("cascade").onDelete("cascade"),
]);

export const funcionario = pgTable("funcionario", {
    idFuncionario: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "funcionario_idFuncionario_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807 }),
    idPessoaFuncionario: bigint({ mode: "number" }).notNull(),
    idCargoFuncionario: bigint({ mode: "number" }).notNull(),
}, (table) => [
    foreignKey({
            columns: [table.idCargoFuncionario],
            foreignColumns: [cargo.idCargo],
            name: "funcionario_idCargoFuncionario_fkey"
        }),
    foreignKey({
            columns: [table.idPessoaFuncionario],
            foreignColumns: [pessoa.idPessoa],
            name: "funcionario_idPessoaFuncionario_fkey"
        }),
]);

export const pessoa = pgTable("pessoa", {
    idPessoa: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "pessoa_idPessoa_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807 }),
    cpfPessoa: varchar().notNull(),
    nomePessoa: varchar().notNull(),
    telefone: varchar().notNull(),
    email: varchar().notNull(),
    userId: uuid().defaultRandom().notNull(),
    endereco: text(),
    tipo: text(),
    ativo: boolean().default(true),
}, (table) => [
    unique("pessoa_cpfPessoa_key").on(table.cpfPessoa),
    pgPolicy("criar pessoas", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`true`  }),
    pgPolicy("editar pessoas", { as: "permissive", for: "update", to: ["public"] }),
    pgPolicy("excluir pessoa", { as: "permissive", for: "delete", to: ["public"] }),
    pgPolicy("selecionar usuarios", { as: "permissive", for: "select", to: ["public"] }),
]);

export const consultaProcedimento = pgTable("consultaProcedimento", {
    idConsulProc: bigint({ mode: "number" }).notNull(),
    idProcConsul: bigint({ mode: "number" }).notNull(),
}, (table) => [
    foreignKey({
            columns: [table.idConsulProc],
            foreignColumns: [consulta.idConsulta],
            name: "consultaProcedimento_idConsulProc_fkey"
        }),
    foreignKey({
            columns: [table.idProcConsul],
            foreignColumns: [procedimento.idProcedimento],
            name: "consultaProcedimento_idProcConsul_fkey"
        }),
]);

export const consulta = pgTable("consulta", {
    idConsulta: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "consulta_idConsulta_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807 }),
    dataHora: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
    tipo: varchar().notNull(),
    status: varchar().notNull(),
    idPacienteConsulta: bigint({ mode: "number" }).notNull(),
    idFuncionarioConsulta: bigint({ mode: "number" }).notNull(),
}, (table) => [
    foreignKey({
            columns: [table.idFuncionarioConsulta],
            foreignColumns: [funcionario.idFuncionario],
            name: "consulta_idFuncionarioConsulta_fkey"
        }),
    foreignKey({
            columns: [table.idPacienteConsulta],
            foreignColumns: [paciente.idPaciente],
            name: "consulta_idPacienteConsulta_fkey"
        }),
    pgPolicy("Enable delete for users based on user_id", { as: "permissive", for: "delete", to: ["public"], using: sql`true` }),
    pgPolicy("adicionar consultas", { as: "permissive", for: "insert", to: ["authenticated"] }),
    pgPolicy("atualizar consultas", { as: "permissive", for: "update", to: ["authenticated"] }),
    pgPolicy("selecionar consultas", { as: "permissive", for: "select", to: ["public"] }),
]);

export const procedimento = pgTable("procedimento", {
    idProcedimento: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "procedimento_idProcedimento_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807 }),
    nomeProcedimento: varchar().notNull(),
    descricao: varchar().notNull(),
    valor: numeric().notNull(),
});

export const cargo = pgTable("cargo", {
    idCargo: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "cargo_idCargo_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807 }),
    nomeCargo: varchar().notNull(),
}, (table) => [
    pgPolicy("Permitir leitura dos cargos", { as: "permissive", for: "select", to: ["authenticated"], using: sql`true` }),
]);