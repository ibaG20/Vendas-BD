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




/* import { db } from "../db.js";

export const getVendas = (_, res) => {
    const q = "SELECT * FROM tb_vendas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        if (!data.rows.length) return res.status(200).json('vazio');
        return res.status(200).json(data);
    });
}; */