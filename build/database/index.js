"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pool;
if (process.env.NODE_ENV === "dev") {
    pool = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT),
    });
}
if (process.env.NODE_ENV === "test") {
    pool = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB_TEST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT),
    });
}
// pool.on("error", (error: Error) => {
//   console.log(error.message);
// });
exports.default = pool;
