import express from "express";
import fornecedorRoutes from "./routes/fornecedores.js";
import funcionarioRoutes from "./routes/funcionarios.js";
import vendasRoutes from "./routes/vendas.js";
import produtosRoutes from "./routes/produtos.js";
import itensRoutes from "./routes/itens.js";
import loginRoutes from "./routes/login.js";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/", fornecedorRoutes);
app.use("/", funcionarioRoutes);
app.use("/", vendasRoutes);
app.use("/", produtosRoutes);
app.use("/", itensRoutes);
app.use("/", loginRoutes);

app.listen(8800);