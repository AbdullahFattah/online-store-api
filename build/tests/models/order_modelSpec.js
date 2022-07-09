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
const order_model_1 = __importDefault(require("../../models/order_model"));
const user_model_1 = __importDefault(require("../../models/user_model"));
const store = new order_model_1.default();
const storeUser = new user_model_1.default();
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
describe("Test methods of the order model", () => {
    const order = {
        product_id: "1",
    };
    const user = {
        first_name: "Test user",
        last_name: "Test user",
        username: "OrderUser",
        password: "123",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield store.createOrder(order);
        order.id = createdOrder.id;
        yield storeUser.create(user);
    }));
    it("Should return created order", () => __awaiter(void 0, void 0, void 0, function* () {
        const testOrder = yield store.createOrder({
            user_id: user.id,
        });
        expect(testOrder).toEqual(testOrder);
    }));
    it("Close order closes active orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const closeOrder = yield store.closeOrder("1");
        expect(closeOrder.status).toBe("Completed");
    }));
    it("Index returns available orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const shownOrder = yield store.getOrder(order.id);
        expect(shownOrder.id).toBe(order.id);
        expect(shownOrder.status).toBe(shownOrder.status);
        expect(shownOrder.user_id).toBe(shownOrder.user_id);
    }));
});
