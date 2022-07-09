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
const database_1 = __importDefault(require("../../database"));
const store = new user_model_1.default();
describe("Authentication", () => {
    describe("Test methods exist", () => {
        it("should have an method to authenticate users", () => {
            expect(store.authenticate).toBeDefined();
        });
    });
    describe("Test authentication logic", () => {
        const user = {
            first_name: "first_test",
            last_name: "last_test",
            username: "usernameTest",
            password: "test",
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield store.create(user);
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "DELETE FROM users";
            yield conn.query(sql);
            conn.release();
        }));
        it("should return athenticated user info", () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield store.authenticate(user.username, user.password);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.first_name).toBe(user.first_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.last_name).toBe(user.last_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.username).toBe(user.username);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.password).toBe(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.password);
        }));
        it("should not return non-authenticated user info", () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield store.authenticate(" ", " ");
            expect(authenticatedUser).toBe(null);
        }));
    });
});
