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
const user_model_1 = __importDefault(require("../../models/user_model"));
// Store
const store = new user_model_1.default();
describe("User model", () => {
    describe("Model methods exist", () => {
        it("Contains a method to get users index", () => {
            expect(store.index).toBeDefined();
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
describe("Test methods for the user model", () => {
    const user = {
        first_name: "first name test",
        last_name: "last name test",
        username: "Username test",
        password: "123",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield store.create(user);
        user.id = createdUser.id;
    }));
    // afterAll(async () => {
    //   const conn = await Client.connect();
    //   const sql = "DELETE FROM users;";
    //   await conn.query(sql);
    //   conn.release();
    // });
    it("Create user method returns created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield store.create({
            first_name: "user first",
            last_name: "user last",
            username: "username",
            password: "123",
        });
        expect(createdUser).toEqual({
            id: createdUser.id,
            first_name: "user first",
            last_name: "user last",
            username: "username",
        });
    }));
    it("Index method returns available users", () => __awaiter(void 0, void 0, void 0, function* () {
        const index = yield store.index();
        expect(index.length).toBeGreaterThan(1);
    }));
    it("Calling get user should return requested user", () => __awaiter(void 0, void 0, void 0, function* () {
        const returnedUser = yield store.getUser(user.id);
        expect(returnedUser.id).toBe(user.id);
        expect(returnedUser.first_name).toBe(user.first_name);
        expect(returnedUser.last_name).toBe(user.last_name);
        expect(returnedUser.username).toBe(user.username);
    }));
    it("Updating a user returns the new updated user info", () => __awaiter(void 0, void 0, void 0, function* () {
        const update = yield store.updateUser(Object.assign(Object.assign({}, user), { username: "Updated!" }));
        expect(update.username).toBe("Updated!");
    }));
    it("Delete method deletes user", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleted = yield store.deleteUser(user.id);
        expect(deleted.id).toBe(user.id);
    }));
});
