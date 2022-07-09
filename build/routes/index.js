"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./api/users_route"));
const products_route_1 = __importDefault(require("./api/products_route"));
const orders_route_1 = __importDefault(require("./api/orders_route"));
const routes = express_1.default.Router();
routes.use("/orders", orders_route_1.default);
routes.use("/users", users_route_1.default);
routes.use("/products", products_route_1.default);
exports.default = routes;
