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
const product_model_1 = __importDefault(require("../../models/product_model"));
const store = new product_model_1.default();
describe("Product model", () => {
    describe("Check the model methods", () => {
        it("Should be able to get products index", () => {
            expect(store.index).toBeDefined();
        });
        it("Should be able to show a specific product", () => {
            expect(store.showProduct).toBeDefined();
        });
        it("Should be able to create a new product", () => {
            expect(store.create).toBeDefined();
        });
        store;
        it("Should be able to delete a product", () => {
            expect(store.deleteProduct).toBeDefined();
        });
    });
});
describe("Test methods for products model", () => {
    const product = {
        name: "Test product",
        price: "1000",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const testProduct = yield store.create(product);
        product.id = testProduct.id;
    }));
    it("Add product method returns added product", () => __awaiter(void 0, void 0, void 0, function* () {
        const testProduct = yield store.create({
            name: "Test product",
            price: parseInt("1000"),
        });
        expect(testProduct).toEqual({
            id: testProduct.id,
            name: "Test product",
            price: parseInt("1000"),
        });
    }));
    it("Index method views all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const index = yield store.index();
        expect(index.length).toBeGreaterThan(1);
    }));
    it("Calling show product returns requested product", () => __awaiter(void 0, void 0, void 0, function* () {
        const returnedProduct = yield store.showProduct(product.id);
        expect(returnedProduct.id).toBe(product.id);
    }));
    it("Delete product removes the product", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleted = yield store.deleteProduct(product.id);
        expect(deleted.id).toBe(product.id);
    }));
});
