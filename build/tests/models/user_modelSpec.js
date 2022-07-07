"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user_model"));
// Store
const store = new user_model_1.default();
describe("User model", () => {
    describe("Model methods exist", () => {
        it("Contains a method to get users index", () => {
            expect(store.getUsers).toBeDefined();
        });
        it("Contains a method to get a specific user", () => {
            expect(store.getUser).toBeDefined();
        });
        it("Contains a method to create a new user", () => {
            expect(store.create).toBeDefined();
        });
        it("Contains a method to update user details", () => {
            expect(store.updateUser).toBeDefined();
        });
        it("Contains a method to delete a user", () => {
            expect(store.deleteUser).toBeDefined();
        });
    });
});
