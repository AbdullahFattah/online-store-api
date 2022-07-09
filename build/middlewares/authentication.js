"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthorizedError = (next) => {
    const error = new Error("Unable to log in, try again later");
    next(error);
};
const validateTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (authHeader) {
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];
            if (token && bearer === "Bearer") {
                const decode = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                if (decode) {
                    next();
                }
                else {
                    unauthorizedError(next);
                }
            }
            else {
                unauthorizedError(next);
            }
        }
        else {
            unauthorizedError(next);
        }
    }
    catch (error) {
        unauthorizedError(next);
    }
};
exports.default = validateTokenMiddleware;
