"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const basic_authentication_middleware_1 = __importDefault(require("../middlewares/basic-authentication.middleware"));
const jwt_authentication_middleware_1 = __importDefault(require("../middlewares/jwt-authentication.middleware"));
const forbidden_error_model_1 = __importDefault(require("../models/errors/forbidden.error.model"));
const authorizationRoute = (0, express_1.Router)();
authorizationRoute.post("/token/validate", jwt_authentication_middleware_1.default, (req, res, next) => {
    res.sendStatus(http_status_codes_1.StatusCodes.OK);
});
authorizationRoute.post("/token", basic_authentication_middleware_1.default, async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new forbidden_error_model_1.default("Usuário não encontrado!");
        }
        const jwtPayload = { username: user.username };
        const jwtOptions = {
            subject: user === null || user === void 0 ? void 0 : user.uuid,
            expiresIn: "15m",
        };
        const secretKey = "secret_key";
        const jwt = jsonwebtoken_1.default.sign(jwtPayload, secretKey, jwtOptions);
        res.status(http_status_codes_1.StatusCodes.OK).json({ token: jwt });
    }
    catch (error) {
        next(error);
    }
});
exports.default = authorizationRoute;
