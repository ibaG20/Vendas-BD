import express from "express";
import { getVendas, postVendas } from "../controllers/vendas.js";

const router = express.Router();

router.get("/vendas", getVendas);
router.post("/vendas", postVendas);

export default router;