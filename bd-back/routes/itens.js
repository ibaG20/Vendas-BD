import express from "express";
import { getItens } from "../controllers/itens.js"

const router = express.Router();

router.get("/itens", getItens);

export default router; 