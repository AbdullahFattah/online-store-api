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
const supertest_1 = __importDefault(require("supertest"));
const product_model_1 = __importDefault(require("../../../models/product_model"));
const index_1 = __importDefault(require("../../../index"));
const store = new product_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
describe("Product API endpoints", () => {
    const product = {
        name: "Test product",
        price: "1000",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const testProduct = yield store.create(product);
        product.id = testProduct.id;
    }));
    describe("Test endpoint connection", () => {
        it("Should connect and return status code 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/api/products");
            expect(response.status).toBe(200);
        }));
    });
    describe("Products CRUD functionality", () => __awaiter(void 0, void 0, void 0, function* () {
        it("Should be able to get index of products", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get("/api/products")
                .set("Content-type", "application/json");
            expect(response.status).toBe(200);
            expect(response.body.length).not.toEqual(null || undefined);
        }));
        it("Should be able to get a product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/api/products/2`)
                .set("Content-type", "application/json");
            expect(response.status).toBe(200);
            expect(response.body.name).not.toBe(null || undefined);
            expect(response.body.price).not.toBe(null || undefined);
        }));
    }));
});
