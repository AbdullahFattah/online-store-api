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
exports.authenticate = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.create(req.body);
        res.json({
            Data: Object.assign({}, user),
            Note: "User has been added successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.getUsers();
        res.json({
            Action: "View all users",
            data: Object.assign({}, users),
            Note: "Request complete",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.getUser(req.params.id);
        res.json({
            Action: "View a user",
            data: Object.assign({}, user),
            Note: "Request complete",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield store.updateUser(req.body);
        res.json({
            Action: "Update user details",
            data: Object.assign({}, update),
            Note: "Request complete",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDelete = yield store.deleteUser(req.params.id);
        res.json({
            Action: "Delete a user",
            Data: Object.assign({}, userDelete),
            Note: "User has been deleted",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield store.authenticate(username, password);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        if (!user) {
            return res.status(401).json({
                Message: "Unable to log in, make sure the user exists and the credentials are correct.",
            });
        }
        return res.json({
            Action: "Login",
            Data: Object.assign(Object.assign({}, user), { token }),
            Note: "Request complete",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.authenticate = authenticate;
