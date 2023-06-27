import { db } from "../db.js";
import pkg from 'pg';
const { Client } = pkg;

export const postLogin = async (req, res) => {
    // Conecta com o usuário e senha fornecidos
    const client = new Client({
        //host: "localhost",
        ...db,
        user: req.body.username,
        password: req.body.password,
        //database: "attdb2"
    });

    try {
        await client.connect(); // Tenta conectar

        // Se a conexão for bem sucedida, as credenciais estão corretas
        res.status(200).json({ message: "Login bem sucedido" });
    } catch (err) {
        // Se a conexão falhar, as credenciais estão erradas
        console.log(err.message);
        res.status(401).json({ message: "Login falhou" });
    } finally {
        await client.end(); // Encerra a conexão
    }
};

/*
A mensagem de erro "Client has already been connected. You cannot reuse a client." 
indica que você está tentando usar um cliente que já foi conectado. No PostgreSQL 
do Node.js, um cliente não pode ser reutilizado após ter sido conectado. Isso 
significa que você precisa criar um novo cliente para cada conexão.

Em seu código, parece que você está exportando um único cliente do módulo db.js e 
tentando reutilizá-lo para cada solicitação. Isso não funcionará, porque uma vez 
que um cliente é conectado, ele não pode ser conectado novamente.

Uma solução melhor seria exportar a configuração do cliente, e então criar e 
conectar um novo cliente para cada solicitação. Aqui está como você pode fazer isso:

--------------------------------------------------------------------
1. Modifique seu módulo db.js para exportar a configuração do cliente:
import pkg from 'pg';
const { Client } = pkg;

export const dbConfig = {
    host: "localhost",
    user: "administrador",
    password: "root", 
    database: "attdb2" 
};

--------------------------------------------------------------------
2. Crie e conecte um novo cliente para cada solicitação no seu controler de login:
import express from "express";
import { dbConfig } from "./db.js"; // Importe a configuração do cliente do banco de dados
import pkg from 'pg';
const { Client } = pkg;

const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
    // Cria um novo cliente para cada requisição
    const client = new Client({
        ...dbConfig,
        user: req.body.username,
        password: req.body.password
    });

    try {
        await client.connect(); // Tenta conectar

        // Se a conexão for bem sucedida, as credenciais estão corretas
        res.status(200).json({ message: "Login bem sucedido" });
    } catch (err) {
        console.log(err.message);
        // Se a conexão falhar, as credenciais estão erradas
        res.status(401).json({ message: "Login falhou" });
    } finally {
        await client.end(); // Encerra a conexão
    }
});

app.listen(8800);

*/

