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
export const postVendas = (req, res) => {
  const { ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo, itens } = req.body;

  const insertVendaSql = "INSERT INTO tb_vendas(ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo) VALUES ($1, $2, $3, $4)";
  const vendaValues = [ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo];

  db.query(insertVendaSql, vendaValues, (err, result) => {
    if (err) {
      db.end(); // Feche a conexão em caso de erro
      return res.json(err);
    }

    const vendaId = vendaValues[0]; // Obtém o ID da venda inserida

    const insertItensSql = "INSERT INTO tb_itens(ite_codigo, ite_quantidade, ite_valor_parcial, tb_produtos_pro_codigo, tb_vendas_ven_codigo) VALUES ($1, $2, $3, $4, $5)";

    const itensValues = itens.map(item => [
      item.ite_codigo,
      item.ite_quantidade,
      item.ite_valor_parcial,
      item.tb_produtos_pro_codigo,
      vendaId
    ]);

    db.query(insertItensSql, itensValues, (err, result) => {
      db.end(); // Feche a conexão após a conclusão das consultas

      if (err) return res.json(err);

      return res.status(200).json("Venda e itens inseridos com sucesso!");
    });
  });
};
//------------------------------------------------
