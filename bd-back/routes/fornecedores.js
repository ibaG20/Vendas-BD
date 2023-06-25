import express from "express";
import { getFornecedores } from "../controllers/fornecedores.js"

const router = express.Router();

router.get("/fornecedores", getFornecedores);

export default router;