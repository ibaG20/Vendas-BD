import pkg from 'pg';
import jwt from 'jsonwebtoken';
const { Client } = pkg;
import { dbAdmin, dbUser } from "../db.js"; // Importa as conexões

export const getVendas = async (req, res) => {
  const q = "SELECT * FROM tb_vendas";


  // Verifica o usuário através do token na requisição
  const user = jwt.verify(req.headers.authorization.split(' ')[1], 'your-secret-key');
  console.log(user);
  // Cria um novo cliente
  let client
  if (user.role === 'user') {
    client = new Client({
      host: "localhost",
      database: "postgres",
      user: "administrador",
      password: "root",
    });
  } else if (user.role === 'admin') {
    client = new Client({
      host: "localhost",
      database: "postgres",
      user: "vendedor",
      password: "root",
    });
  } else {
    return res.status(401).json({ message: "Role inválido" });
  }
  console.log(client);

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
export const postVendas = async (req, res) => {
  const { ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo, itens } = req.body;

  const insertVendaSql = "INSERT INTO tb_vendas(ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo) VALUES ($1, $2, $3, $4)";
  const vendaValues = [ven_codigo, ven_horario, ven_valor_total, tb_funcionarios_fun_codigo];

  const insertItensSql = "INSERT INTO tb_itens (ite_codigo, ite_quantidade, ite_valor_parcial, tb_produtos_pro_codigo, tb_vendas_ven_codigo) VALUES ($1, $2, $3, $4, $5)"
  const vendaId = vendaValues[0]; // Obtém o ID da venda inserida
  let itensValues = [itens[0].ite_codigo, itens[0].ite_quantidade, itens[0].ite_valor_parcial, itens[0].tb_produtos_pro_codigo, vendaId]


  // Verifica o usuário através do token na requisição
  const user = jwt.verify(req.headers.authorization.split(' ')[1], 'your-secret-key');
  console.log(user);
  // Cria um novo cliente
  let client
  if (user.role === 'user') {
    client = new Client({
      host: "localhost",
      database: "postgres",
      user: "administrador",
      password: "root",
    });
  } else if (user.role === 'admin') {
    client = new Client({
      host: "localhost",
      database: "postgres",
      user: "vendedor",
      password: "root",
    });
  } else {
    return res.status(401).json({ message: "Role inválido" });
  }

  try {
    // Conecta o cliente
    await client.connect();

    // Realiza a inserção da venda
    await client.query(insertVendaSql, vendaValues);
    for (let i = 1; i <= itens.length; i++) {
      await client.query('COMMIT');
      await client.query(insertItensSql, itensValues);
      itensValues = [itens[i].ite_codigo, itens[i].ite_quantidade, itens[i].ite_valor_parcial, itens[i].tb_produtos_pro_codigo, vendaId];
      console.log(itensValues);
    }

    // Confirma a transação
    await client.query('COMMIT');

  } catch (err) {
    // Se houver um erro, responde com o erro
    return res.json(err);
  } finally {
    // Independentemente do que acontecer, fecha a conexão
    await client.end();
  }
};