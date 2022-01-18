"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const database_error_model_1 = __importDefault(require("../models/errors/database.error.model"));
class UserRepository {
    async findAllUsers() {
        const query = `
        SELECT uuid, username
        FROM application_user
      `;
        const { rows } = await db_1.default.query(query);
        return rows || [];
    }
    async findById(uuid) {
        try {
            const query = `
        SELECT uuid, username
        FROM application_user
        WHERE uuid = $1
    `;
            const values = [uuid];
            const { rows } = await db_1.default.query(query, values);
            const [user] = rows;
            return user;
        }
        catch (error) {
            throw new database_error_model_1.default("Error na consulta por ID", error);
        }
    }
    async create(user) {
        const insert = `
        INSERT INTO application_user(
            username,
            password
        )
        VALUES($1,crypt($2,'db_slt'))
        RETURNING uuid
      `;
        const values = [user.username, user.password];
        const { rows } = await db_1.default.query(insert, values);
        const [newUser] = rows;
        return newUser.uuid;
    }
    async update(user) {
        const updateScritp = `
        UPDATE application_user
        SET
            username = $1,
            password = crypt($2,'db_slt')
        
        WHERE uuid = $3
       `;
        const values = [user.username, user.password, user.uuid];
        await db_1.default.query(updateScritp, values);
    }
    async remove(uuid) {
        const removeScritp = `
        DELETE
        FROM application_user
        WHERE uuid = $1
    `;
        const values = [uuid];
        await db_1.default.query(removeScritp, values);
    }
    async findByUsernameAndPassword(username, password) {
        try {
            const query = `
      SELECT uuid, username
      FROM application_user
      WHERE username = $1
      AND password = crypt($2,'db_slt')
    `;
            const values = [username, password];
            const { rows } = await db_1.default.query(query, values);
            const [user] = rows;
            return user || null;
        }
        catch (error) {
            throw new database_error_model_1.default("Usuário não encontrado!", error);
        }
    }
}
exports.default = new UserRepository();
