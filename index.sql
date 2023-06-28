CREATE INDEX idx_nomefuncionarios ON tb_funcionarios(fun_nome);
CREATE INDEX idx_funcao ON tb_funcionarios(fun_funcao);

CREATE INDEX idx_descricaofornecedores ON tb_fornecedores(for_descricao);
CREATE INDEX idx_forcodigo ON tb_fornecedores(for_codigo);

CREATE INDEX idx_funcodigo_vendas ON tb_vendas(tb_funcionarios_fun_codigo);
CREATE INDEX idx_horarioVenda ON tb_vendas(ven_horario);

CREATE INDEX idx_descricaoProduto ON tb_produto(pro_descricao);