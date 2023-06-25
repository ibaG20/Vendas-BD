import { db } from "../db.js";

export const getFuncionarios = (_, res) => {
    const q = "SELECT * FROM tb_funcionarios";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        if (!data.rows.length) return res.status(200).json('vazio');
        return res.status(200).json(data);
    });
};
