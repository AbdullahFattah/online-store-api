import supertest from "supertest";
import UserModel from "../../../models/user_model";
import User from "../../../types/user_types";
import app from "../../../index";

const store = new UserModel();
const request = supertest(app);
let token: void;

describe("User API endpoints", () => {
  const user = {
    first_name: "Test first",
    last_name: "Test last",
    username: "UsernameTest",
    password: "123",
  } as User;

  beforeAll(async () => {
    const testUser = await store.create(user);
    user.id = testUser.id;
  });

  describe("Authentication endpoint", () => {
    it("Should authenticate user using token", async () => {
      const response = await request
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
    });

    it("Should error when user authentication fails", async () => {
      const response = await request
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          username: " ",
          password: " ",
        });
      expect(response.status).toBe(401);
    });
  });

  describe("Test CRUD functionality for users", () => {
    it("Should be able to create a new user", async () => {
      const response = await request
        .post("/api/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          first_name: "FirstName",
          last_name: "LastName",
          username: "Username1",
          password: "123",
        } as User);
      expect(response.status).toBe(200);
    });
    it("Should get users index", async () => {
      const response = await request
        .get("/api/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.length).not.toEqual(null);
    });

    it("Should get user info", async () => {
      const response = await request
        .get(`/api/users/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("UsernameTest");
    });

    it("Should be able to delete user", async () => {
      const response = await request
        .delete(`/api/users/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.Data.id).toBe(user.id);
      expect(response.body.Data.username).toBe("UsernameTest");
    });
  });
});
