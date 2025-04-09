import express from "express";
import cors from "cors";
import sequelize from "../src/config/database";
import usuarioRota from "./routes/usuarioRota";
import categoriaRota from "./routes/categoriaRota";
import locadoraRota from "./routes/locadorasRota";
import loginRota from "./routes/loginRoutes";
import veiculosRota from "./routes/veiculosRota";
import aluguelRota from "./routes/aluguelRota";

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

//rota para o crud de usuários
app.use(usuarioRota);

//rota para o crud de categorias
app.use(categoriaRota)

//rota para o crud de locadoras
app.use(locadoraRota)

//rota para a validação de login
app.use(loginRota);

//rota para o crud de veículos
app.use(veiculosRota);

//rota para o crud de alugueis
app.use(aluguelRota);

//rota de teste
app.get("/", (req, res) => {
  res.send("Projeto Rodando");
});

//testando conexão com o banco:
sequelize.authenticate()
.then(() => {
    console.log("Conexão feita com o banco de dados!");
})
.catch((error) => {
    console.error(`Conexão com o banco falhou`, error);
});

sequelize
.sync({alter: true})
.then(() => {
  console.log("Database sincronizado com sucesso!")
})
.catch((error) => {
  console.log(`Deu pau`, error);
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: `, port);
});
