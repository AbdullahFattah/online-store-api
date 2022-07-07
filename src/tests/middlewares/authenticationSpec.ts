import UserModel from "../../models/user_model";
import Client from "../../database";
import User from "../../types/user_types";

const store = new UserModel();

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
    } as User;

    beforeAll(async () => {
      try {
        await store.create(user);
      } catch (err) {
        throw new Error(`${err}`);
      }
    });

    afterAll(async () => {
      const conn = await Client.connect();
      const sql = "DELETE FROM users";
      await conn.query(sql);
      conn.release();
    });

    it("should return athenticated user info", async () => {
      const authenticatedUser = await store.authenticate(
        user.username,
        user.password as unknown as string
      );
      expect(authenticatedUser?.first_name).toBe(user.first_name);
      expect(authenticatedUser?.last_name).toBe(user.last_name);
      expect(authenticatedUser?.username).toBe(user.username);
      expect(authenticatedUser?.password).toBe(authenticatedUser?.password);
    });

    it("should not return non-authenticated user info", async () => {
      const authenticatedUser = await store.authenticate(" ", " ");
      expect(authenticatedUser).toBe(null);
    });
  });
});
