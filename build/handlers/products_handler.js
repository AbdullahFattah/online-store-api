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
exports.deleteProduct = exports.showProduct = exports.index = exports.create = void 0;
const product_model_1 = __importDefault(require("../models/product_model"));
const store = new product_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.create(req.body);
        res.json({
            Data: Object.assign({}, product),
            Note: "Product has been added successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = yield store.index();
        res.json(index);
    }
    catch (err) {
        next(err);
    }
});
exports.index = index;
const showProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.showProduct(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.send(`The product with id (${req.params.id}) doesn't exist, please make sure you have the correct id`);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.showProduct = showProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.deleteProduct(req.params.id);
        if (product) {
            res.json({
                data: product,
                Note: `Product with id ${req.params.id} has been deleted.`,
            });
        }
        else {
            res.send(`Product with id (${req.params.id}) doesn't exist, please make sure you have the correct id`);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProduct = deleteProduct;
