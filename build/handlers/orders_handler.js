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
exports.closeOrder = exports.addProduct = exports.getOrder = exports.ordersIndex = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order_model"));
const store = new order_model_1.default();
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.createOrder(req.body);
        res.json(order);
    }
    catch (err) {
        next(err);
    }
});
exports.createOrder = createOrder;
const ordersIndex = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.ordersIndex();
        if (orders) {
            res.json(orders);
        }
        else {
            res.send("The orders tab is currently empty, add new orders to view");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.ordersIndex = ordersIndex;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.getOrder(req.params.id);
        if (order) {
            res.json(order);
        }
        else {
            res.send(`The order with id (${req.params.id}) doesn't exist, please make sure you have the correct id`);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getOrder = getOrder;
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const quantity = req.body.quantity;
    const orderId = req.params.id;
    const productId = req.body.product_id;
    try {
        const product = yield store.addProduct(quantity, orderId, productId);
        res.json(product);
    }
    catch (err) {
        next(err);
    }
});
exports.addProduct = addProduct;
const closeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const closedOrder = yield store.closeOrder(req.body.id);
        if (closedOrder) {
            if (closedOrder.status == "Completed") {
                res.send("Order is already closed");
            }
            else {
                res.json(closedOrder);
            }
        }
        else {
            res.send(`Order with id (${req.body.id}) doesn't exist, please make sure you have the correct id`);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.closeOrder = closeOrder;
