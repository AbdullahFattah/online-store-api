"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../../models/order_model"));
const store = new order_model_1.default();
describe("Product model", () => {
    describe("Check the model methods", () => {
        it("Should be able to get orders index", () => {
            expect(store.ordersIndex).toBeDefined();
        });
        it("Should get a specific order", () => {
            expect(store.getOrder).toBeDefined();
        });
        it("Should be able to place a new order", () => {
            expect(store.createOrder).toBeDefined();
        });
        it("Should add a product to an existing order", () => {
            expect(store.addProduct).toBeDefined();
        });
    });
});
