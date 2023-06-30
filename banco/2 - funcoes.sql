/*Retorna o tempo de ANALYSE para o SELECT passado de parametro*/
CREATE OR REPLACE FUNCTION Time_ExecutionPlanning(select_query TEXT) RETURNS TABLE (planning_time TEXT, execution_time TEXT)
AS $$
DECLARE
  total TEXT;
BEGIN
  EXECUTE 'EXPLAIN (ANALYZE, FORMAT JSON) ' || select_query INTO total;
  RETURN QUERY SELECT (total::jsonb)->0->>'Planning Time', (total::jsonb)->0->>'Execution Time';
END;
$$ LANGUAGE plpgsql;

/*Calcula a média de QtdExecuções execuções do SELECT passado de parametro e retorna o tempo de planning e o de execution*/
CREATE OR REPLACE FUNCTION media_execution_planning(sqlCodeText TEXT, QtdExecuções INTEGER, idEx INTEGER, nomeView VARCHAR) RETURNS TABLE(planning_time_avg NUMERIC, execution_time_avg NUMERIC, idEx_re INTEGER, nomeView_re VARCHAR)
AS $$
DECLARE
    totalPlanningTime NUMERIC := 0;
    totalExecutionTime NUMERIC := 0;
    planning_time_str TEXT;
    planning_time NUMERIC;
    exec_time_str TEXT;
    exec_time NUMERIC;
BEGIN
    FOR i IN 1..QtdExecuções LOOP
        SELECT * INTO planning_time_str, exec_time_str FROM Time_ExecutionPlanning(sqlCodeText);
        EXECUTE 'SELECT ' || regexp_replace(planning_time_str, '[^0-9\.]', '', 'g') INTO planning_time;
        EXECUTE 'SELECT ' || regexp_replace(exec_time_str, '[^0-9\.]', '', 'g') INTO exec_time;
        totalPlanningTime := totalPlanningTime + planning_time;
        totalExecutionTime := totalExecutionTime + exec_time;
    END LOOP;
    	planning_time_avg := (totalPlanningTime/10);
    	execution_time_avg := (totalExecutionTime/10);
		idEx_re := idEx;
		nomeView_re := nomeView;
    RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- Cria a tabela para armazenar os resultados
DROP TABLE IF EXISTS ExecutionStats;
CREATE TABLE ExecutionStats (
  	planning_time_avg NUMERIC,
  	execution_time_avg NUMERIC,
	idex INT NOT NULL,
	nomeView VARCHAR
);
DELETE FROM ExecutionStats;

CREATE OR REPLACE FUNCTION commit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  -- Verifica se ocorreu um erro de violação de constraint
  IF TG_OP = 'INSERT' THEN
    -- Verifica a violação de chave primária
    IF NOT EXISTS (SELECT 1 FROM tb_vendas WHERE ven_codigo = NEW.tb_vendas_ven_codigo) THEN
      -- Rollback da transação em caso de erro
      RAISE EXCEPTION 'Venda não existente! rollback realizado';
    END IF;
  END IF;

  -- Retorna o NEW para permitir a operação caso não ocorra erro
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_insertItens
BEFORE INSERT OR UPDATE ON tb_itens
FOR EACH ROW
EXECUTE FUNCTION commit_trigger();