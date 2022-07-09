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
const user_model_1 = __importDefault(require("../../../models/user_model"));
const index_1 = __importDefault(require("../../../index"));
const store = new user_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token;
describe("User API endpoints", () => {
    const user = {
        first_name: "Test first",
        last_name: "Test last",
        username: "UsernameTest",
        password: "123",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const testUser = yield store.create(user);
        user.id = testUser.id;
    }));
    describe("Authentication endpoint", () => {
        it("Should authenticate user using token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post("/api/users/authenticate")
                .set("Content-type", "application/json")
                .send({
                username: "UsernameTest",
                password: "123",
            });
            expect(response.status).toBe(200);
            const { id, username, token: userToken } = response.body.Data;
            expect(id).toBe(user.id);
            expect(username).toBe("UsernameTest");
            token = userToken;
        }));
        it("Should error when user authentication fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post("/api/users/authenticate")
                .set("Content-type", "application/json")
                .send({
                username: " ",
                password: " ",
            });
            expect(response.status).toBe(401);
        }));
    });
    describe("Test CRUD functionality for users", () => {
        it("Should be able to create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post("/api/users")
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .send({
                first_name: "FirstName",
                last_name: "LastName",
                username: "Username1",
                password: "123",
            });
            expect(response.status).toBe(200);
        }));
        it("Should get users index", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get("/api/users")
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.data.length).not.toEqual(null);
        }));
        it("Should get user info", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/api/users/${user.id}`)
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.data.username).toBe("UsernameTest");
        }));
        it("Should be able to delete user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete(`/api/users/${user.id}`)
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.Data.id).toBe(user.id);
            expect(response.body.Data.username).toBe("UsernameTest");
        }));
    });
});
