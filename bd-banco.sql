CREATE TABLE tb_fornecedores(
	for_codigo INTEGER PRIMARY KEY NOT NULL,
	for_descricao VARCHAR(100)
);

INSERT INTO tb_fornecedores(for_codigo, for_descricao) VALUES (1, 'Nome1');
INSERT INTO tb_fornecedores(for_codigo, for_descricao) VALUES (2, 'Nome2');
INSERT INTO tb_fornecedores(for_codigo, for_descricao) VALUES (3, 'Nome3');
INSERT INTO tb_fornecedores(for_codigo, for_descricao) VALUES (4, 'Nome4');

CREATE TABLE tb_funcionarios(
	fun_codigo INTEGER PRIMARY KEY NOT NULL,
	fun_nome VARCHAR(100),
	fun_cpf VARCHAR(14),
	fun_senha VARCHAR(50),
	fun_funcao VARCHAR(50)
);

CREATE TABLE tb_vendas(
	ven_codigo INTEGER PRIMARY KEY NOT NULL,
	ven_horario TIMESTAMP,
	ven_valor_total DECIMAL(7,2),
	tb_funcionarios_fun_codigo BIGINT
);

CREATE TABLE tb_produto(
	pro_codigo INTEGER PRIMARY KEY NOT NULL,
	pro_descricao VARCHAR(100),
	pro_valor DECIMAL(7,2),
	pro_quantidade INT,
	tb_fornecedores_for_codigo BIGINT
);

CREATE TABLE tb_itens(
	ite_codigo BIGINT PRIMARY KEY NOT NULL,
	ite_quantidade VARCHAR(100),
	ite_valor_parcial DECIMAL(7,2),
	tb_produtos_pro_codigo BIGINT,
	tb_vendas_ven_codigo BIGINT
);

/*-------------------------------------------------------------------------------------*/

/*cria role admin e user*/
CREATE ROLE admin CREATEDB CREATEROLE;
CREATE ROLE user NOSUPERUSER NOCREATEDB NOCREATEROLE;

/*cria usuario administrador*/
CREATE USER ADMINISTRADOR WITH PASSWORD 'root';
/*atribui a role admin pra esse usuario*/
GRANT admin TO ADMINISTRADOR;


/*-----------------------------como tava antes-----------------------------------*/
/*
CREATE USER ADMINISTRADOR;
GRANT ALL PRIVILEGES ON DATABASE attDB2 TO ADMINISTRADOR;

GRANT SELECT ON tb_fornecedores TO ADMINISTRADOR;
GRANT SELECT ON tb_funcionarios TO ADMINISTRADOR;
GRANT SELECT ON tb_vendas TO ADMINISTRADOR;
GRANT SELECT ON tb_produto TO ADMINISTRADOR;
GRANT SELECT ON tb_itens TO ADMINISTRADOR;

ALTER USER ADMINISTRADOR WITH PASSWORD 'root';
*/
