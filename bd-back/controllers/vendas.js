import { db } from "../db.js";

export const getVendas = (_, res) => {
    const q = "SELECT * FROM tb_vendas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        if (!data.rows.length) return res.status(200).json('vazio');
        return res.status(200).json(data);
    });
};