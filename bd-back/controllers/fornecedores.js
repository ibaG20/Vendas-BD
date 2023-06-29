import pkg from 'pg';
import jwt from 'jsonwebtoken';
const { Client } = pkg;
import { dbAdmin, dbUser } from "../db.js"; // Importa as conexões

export const getFornecedores = async (req, res) => {
    const q = "SELECT * FROM tb_fornecedores";

    // Verifica o usuário através do token na requisição
    const user = jwt.verify(req.headers.authorization.split(' ')[1], 'your-secret-key');
    console.log(user);
    // Cria um novo cliente
    let client
    if(user.role === 'user'){
        client = new Client({
            host: "localhost",
            database: "postgres",
            user: "administrador",
            password: "root",
        });
    } else if(user.role === 'admin'){
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
