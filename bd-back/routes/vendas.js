import express from "express";
import { getVendas } from "../controllers/vendas.js"

const router = express.Router();

router.get("/vendas", getVendas);

export default router;