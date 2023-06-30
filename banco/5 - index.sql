CREATE INDEX idx_funcodigo_vendas ON tb_vendas(tb_funcionarios_fun_codigo);
CREATE INDEX idx_horarioVenda ON tb_vendas(ven_horario);

CREATE INDEX idx_descricaofornecedores ON tb_fornecedores(for_descricao);

CREATE INDEX idx_nomefuncionarios ON tb_funcionarios(fun_nome);
CREATE INDEX idx_funcao ON tb_funcionarios(fun_funcao);
------------------------------------------ ANALISES ------------------------------------------
-- VENDAS
CREATE OR REPLACE VIEW vw_produtos AS
SELECT * FROM tb_produto
WHERE pro_descricao = 'Wooden'; -- DADOS:

SELECT * FROM media_execution_planning('SELECT FROM vw_produtos;', 20, 1, 'view vw_produtos'); --Sem index
-- 0.30650000000000000000	2.3206000000000000
CREATE INDEX idx_descricaoProduto ON tb_produto(pro_descricao);

SELECT * FROM media_execution_planning('SELECT FROM vw_produtos;', 20, 2, 'view vw_produtos'); --Com index
-- 0.44390000000000000000	0.46350000000000000000

-- FORNECEDORES
CREATE OR REPLACE VIEW vw_fornecedores AS
SELECT * FROM tb_fornecedores
WHERE for_descricao = 'Luca'; -- DADOS:

SELECT * FROM media_execution_planning('SELECT FROM vw_fornecedores;', 20, 1, 'view vw_fornecedores'); --Sem index
-- 0.42480000000000000000	1.2893000000000000

CREATE INDEX idx_descricaofornecedores ON tb_fornecedores(for_descricao);

SELECT * FROM media_execution_planning('SELECT FROM vw_fornecedores;', 20, 2, 'view vw_fornecedores'); --Com index
-- 0.36510000000000000000	0.08150000000000000000

-- FUNCIONARIOS
CREATE OR REPLACE VIEW vw_funcionarios AS
SELECT * FROM tb_funcionarios
WHERE fun_funcao = 'vendedor'; -- DADOS:

SELECT * FROM media_execution_planning('SELECT FROM vw_funcionarios;', 20, 1, 'view vw_funcionarios'); --Sem index
-- 0.33110000000000000000	1.6132000000000000

CREATE INDEX idx_funcao ON tb_funcionarios(fun_funcao);

SELECT * FROM media_execution_planning('SELECT FROM vw_funcionarios;', 20, 2, 'view vw_funcionarios'); --Com index
-- 0.40890000000000000000	0.09200000000000000000