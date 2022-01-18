"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const status_route_1 = __importDefault(require("./routes/status.route"));
const error_handler_middleware_1 = __importDefault(require("./middlewares/error-handler-middleware"));
const authorization_route_1 = __importDefault(require("./routes/authorization.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(status_route_1.default);
app.use(authorization_route_1.default);
app.use(users_route_1.default);
app.use(error_handler_middleware_1.default);
app.listen(3000, () => {
    console.log("You server: http://localhost:3000");
});
