import express from "express";
import { getProdutos } from "../controllers/produtos.js"

const router = express.Router();

router.get("/produtos", getProdutos);

export default router;