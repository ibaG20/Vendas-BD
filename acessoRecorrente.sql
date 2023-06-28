-- Iniciar a primeira transação
BEGIN;

-- Realizar operações na tabela
UPDATE tb_vendas SET ven_valor_total = 200 WHERE ven_codigo = 1;

-- Aguardar um pouco para simular um acesso concorrente
SELECT pg_sleep(5);

-- Confirmar a primeira transação
COMMIT;

-- Iniciar a segunda transação
BEGIN;

-- Realizar operações na tabela
UPDATE tb_vendas SET ven_valor_total = 300 WHERE ven_codigo = 1;

-- Confirmar a segunda transação
COMMIT;