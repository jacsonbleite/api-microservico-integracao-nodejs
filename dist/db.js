"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv").load();
const connectionString = "postgres://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME";
const db = new pg_1.Pool({ connectionString });
exports.default = db;
