CREATE TABLE tb_fornecedores(
	for_codigo INTEGER PRIMARY KEY NOT NULL,
	for_descricao VARCHAR(100)
);

CREATE TABLE tb_funcionarios(
	fun_codigo INTEGER PRIMARY KEY NOT NULL,
	fun_nome VARCHAR(100),
	fun_cpf VARCHAR(14),
	fun_senha VARCHAR(50),
	fun_funcao VARCHAR(50)
);

CREATE TABLE tb_vendas(
	ven_codigo INTEGER PRIMARY KEY NOT NULL,
	ven_horario TIME,
	ven_valor_total DECIMAL(7,2),
	tb_funcionarios_fun_codigo BIGINT,
	FOREIGN KEY (tb_funcionarios_fun_codigo) REFERENCES tb_funcionarios(fun_codigo)
);

CREATE TABLE tb_produto(
	pro_codigo INTEGER PRIMARY KEY NOT NULL,
	pro_descricao VARCHAR(100),
	pro_valor DECIMAL(7,2),
	pro_quantidade INT,
	tb_fornecedores_for_codigo BIGINT,
	FOREIGN KEY (tb_fornecedores_for_codigo) REFERENCES tb_fornecedores(for_codigo)

);

CREATE TABLE tb_itens(
	ite_codigo BIGINT PRIMARY KEY NOT NULL,
	ite_quantidade VARCHAR(100),
	ite_valor_parcial DECIMAL(7,2),
	tb_produtos_pro_codigo BIGINT,
	tb_vendas_ven_codigo BIGINT,
	FOREIGN KEY (tb_vendas_ven_codigo) REFERENCES tb_vendas(ven_codigo)
);