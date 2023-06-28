import { db } from "../db.js";
import pkg from 'pg';
const { Client } = pkg;

export const getVendas = async (_, res) => {
    const q = "SELECT * FROM tb_vendas";

    // Cria um novo cliente
    const client = new Client(db);

    try {
        // Conecta o cliente
        await client.connect();

        // Realiza a consulta
        const result = await client.query(q);

        // Responde com os dados
        if (!result.rows.length) {
            return res.status(200).json('vazio');
        } else {
            return res.status(200).json(result.rows);
        }
    } catch (err) {
        // Se houver um erro, responde com o erro
        return res.json(err);
    } finally {
        // Independentemente do que acontecer, fecha a conexão
        await client.end();
    }
};

//------------------------------------------------
// Função para lidar com o post de vendas
export const postVendas = async (req, res) => {
  const { ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo, itens } = req.body;

  // Cria um novo cliente
  const client = new Client(db);

  try {
    // Conecta o cliente
    await client.connect();

    // Inicia uma transação
    await client.query('BEGIN');

    // Insere os dados da venda na tabela tb_vendas
    const vendaQuery = {
      text: 'INSERT INTO tb_vendas (ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo]
    };

    const vendaResult = await client.query(vendaQuery);
    const vendaId = vendaResult.rows[0].ven_codigo;
  
    for (let i = 0; i < itens.length; i++){
    // Insere os itens da venda na tabela tb_itens_venda
    let itensQuery = {
      text: 'INSERT INTO tb_itens (ite_codigo, ite_quantidade, ite_valor_parcial, tb_produtos_pro_codigo, tb_vendas_ven_codigo) VALUES ($1, $2, $3, $4, $5)',
      values: [itens[i].ite_codigo, itens[i].ite_quantidade, itens[i].ite_valor_parcial, itens[i].tb_produtos_pro_codigo, vendaId]
    };

    await client.query(itensQuery);

    // Confirma a transação
    await client.query('COMMIT');

    // Retorna uma resposta de sucesso
    return res.status(200).json({ message: 'Venda criada com sucesso!' });
  }
  } catch (err) {
    // Desfaz a transação em caso de erro
    await client.query('ROLLBACK');

    // Retorna o erro
    return res.status(500).json({ error: err.message });
  } finally {
    // Independentemente do que acontecer, fecha a conexão
    await client.end();
  }
};
//------------------------------------------------
