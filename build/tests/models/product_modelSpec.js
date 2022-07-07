"use strict";
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
