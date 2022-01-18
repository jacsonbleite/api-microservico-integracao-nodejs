import express from "express";
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route";
import errorHandler from "./middlewares/error-handler-middleware";
import authorizationRoute from "./routes/authorization.route";

const app = express();

//MIDDLEWARE P/ TRATAMENTO DE JSON
app.use(express.json());
//MIDDLEWARE P/ RETORNO DE CONTEÚDO CORRESPONDENTE (HEADERS Content-Type)
app.use(express.urlencoded({ extended: true }));

// APENAS UMA ROTA DE STATUS
app.use(statusRoute);
//AUTH
app.use(authorizationRoute);
//ROTAS AUTH (CRUD DE USUÁRIOS)
app.use(usersRoute);
//HANDLERS DE ERRO
app.use(errorHandler);

//INICIALIZAÇÃO DO SERVIDOR
app.listen(3000, () => {
  console.log("You server: http://localhost:3000");
});
