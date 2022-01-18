import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();
// const users = [{ uuid: "12345", userName: "Jacson" }];

//RETORNA TODOS USUÁRIOS
usersRoute.get(
  "/users",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers["authorization"]);
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).json(users);
  }
);

//RETORNA UM USUÁRIO COM ID PASSADO COM PARÂMETRO
usersRoute.get(
  "/users/:uuid",
  jwtAuthenticationMiddleware,
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userRepository.findById(uuid);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

//CADASTRA UM USUÁRIO
usersRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
  }
);

//ALTERAÇÃO DE UM USUÁRIO E RETONO
usersRoute.put(
  "/users/:uuid",
  jwtAuthenticationMiddleware,
  async (req: Request<{ uuid: string }>, res: Response, nex: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);

    res.status(StatusCodes.OK).send();
  }
);

//REMOVER USUÁRIO
usersRoute.delete(
  "/users/:uuid",
  jwtAuthenticationMiddleware,
  async (req: Request<{ uuid: string }>, res: Response, nex: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;

//get /users
//get /users/:uuid
//post /users
//put /users/:uuid
//delete /users/:uuid
