"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = (password) => {
    const salt = parseInt(process.env.SALT_ROUNDS);
    return bcrypt_1.default.hashSync(password + process.env.BCRYPT_PASSWORD, salt);
};
class UserModel {
    // Create
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO users (first_name, last_name, username, password)
        values ($1, $2, $3, $4) returning id, first_name, last_name, username`;
                const result = yield conn.query(sql, [
                    u.first_name,
                    u.last_name,
                    u.username,
                    hash(u.password),
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create user:${err.message}`);
            }
        });
    }
    // Get users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT id, first_name, last_name, username from users";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to fetch users (${err.message})`);
            }
        });
    }
    // Get use
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT id, first_name, last_name, username FROM users WHERE id=($1)";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to fetch user (${err.message})`);
            }
        });
    }
    // Update user
    updateUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE users SET first_name=$1, last_name=$2, username=$3, password=$4
        WHERE id = $5
        RETURNING id, first_name, last_name, username`;
                const result = yield conn.query(sql, [
                    u.first_name,
                    u.last_name,
                    u.username,
                    hash(u.password),
                    u.id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to update user (${err.message})`);
            }
        });
    }
    // Delete user
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM users WHERE id=($1)
        RETURNING id, first_name, last_name, username`;
                const result = yield conn.query(sql, [id]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to delete user (${err.message})`);
            }
        });
    }
    // Authenticate user
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT password FROM users WHERE username=$1`;
                const result = yield conn.query(sql, [username]);
                //    !!
                if (result.rows.length) {
                    const { password: hash } = result.rows[0];
                    const passwordCheck = bcrypt_1.default.compareSync(`${password}${process.env.BCRYPT_PASSWORD}`, hash);
                    if (passwordCheck) {
                        const userInfo = yield conn.query("SELECT id, first_name, last_name, username FROM users WHERE username=($1)", [username]);
                        return userInfo.rows[0];
                    }
                }
                conn.release();
                return null;
            }
            catch (err) {
                throw new Error(`Login failed: ${err.message}`);
            }
        });
    }
}
exports.default = UserModel;
