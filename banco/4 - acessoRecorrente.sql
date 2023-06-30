GRANT UPDATE ON TB_VENDAS TO VENDEDOR, ADMINISTRADOR;

-- Iniciar a primeira transação com user VENDEDOR - senha root
BEGIN;

-- Realizar operações na tabela
UPDATE tb_vendas SET ven_valor_total = 200 WHERE ven_codigo = 1;

-- Aguardar um pouco para simular um acesso concorrente
SELECT pg_sleep(5);

-- Confirmar a primeira transação
COMMIT;

-- Iniciar a segunda transação com user ADMINISTRADOR - senha root
BEGIN;

-- Realizar operações na tabela
UPDATE tb_vendas SET ven_valor_total = 300 WHERE ven_codigo = 1;

-- Confirmar a segunda transação
COMMIT;

REVOKE UPDATE ON TB_VENDAS FROM VENDEDOR, ADMINISTRADOR;