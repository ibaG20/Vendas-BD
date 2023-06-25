import express from "express";
import { getFuncionarios } from "../controllers/funcionarios.js"

const router = express.Router();

router.get("/funcionarios", getFuncionarios);

export default router;