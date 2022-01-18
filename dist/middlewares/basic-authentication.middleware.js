"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forbidden_error_model_1 = __importDefault(require("../models/errors/forbidden.error.model"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
async function basicAuthenticationMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers["authorization"];
        if (!authorizationHeader) {
            throw new forbidden_error_model_1.default("Credenciais não informadas!");
        }
        const [authenticationType, token] = authorizationHeader.split(" ");
        if (authenticationType !== "Basic" || !token) {
            throw new forbidden_error_model_1.default("Tipo de utenticação inválido");
        }
        const tokenContent = Buffer.from(token, "base64").toString("utf-8");
        const [username, password] = tokenContent.split(":");
        if (!username || !password) {
            throw new forbidden_error_model_1.default("Usuário e senha inválidos!");
        }
        const user = await user_repository_1.default.findByUsernameAndPassword(username, password);
        if (!user) {
            throw new forbidden_error_model_1.default("Usuário e senha inválidos");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = basicAuthenticationMiddleware;
