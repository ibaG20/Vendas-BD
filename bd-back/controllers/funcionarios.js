/* import { db } from "../db.js";
import pkg from 'pg';
const { Client } = pkg;

export const getFuncionarios = async (_, res) => {
    const q = "SELECT * FROM tb_funcionarios";

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
 */

import pkg from 'pg';
import jwt from 'jsonwebtoken';
const { Client } = pkg;
import { dbAdmin, dbUser } from "../db.js"; // Importa as conexões

export const getFuncionarios = async (req, res) => {
    const q = "SELECT * FROM tb_funcionarios";

    // Verifica o usuário através do token na requisição
    const user = jwt.verify(req.headers.authorization, 'your-secret-key');

    // Cria um novo cliente
    let client;

    if(user.role === 'admin'){
        client = dbAdmin;
    } else if(user.role === 'user'){
        client = dbUser;
    } else {
        return res.status(401).json({ message: "Role inválido" });
    }

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
