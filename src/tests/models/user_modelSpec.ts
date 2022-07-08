import UserModel from "../../models/user_model";
import User from "../../types/user_types";

// Store
const store = new UserModel();

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
  } as User;

  beforeAll(async () => {
    const createdUser = await store.create(user);
    user.id = createdUser.id;
  });

  // afterAll(async () => {
  //   const conn = await Client.connect();
  //   const sql = "DELETE FROM users;";
  //   await conn.query(sql);
  //   conn.release();
  // });

  it("Create user method returns created user", async () => {
    const createdUser = await store.create({
      first_name: "user first",
      last_name: "user last",
      username: "username",
      password: "123",
    } as User);
    expect(createdUser).toEqual({
      id: createdUser.id,
      first_name: "user first",
      last_name: "user last",
      username: "username",
    } as User);
  });

  it("Index method returns available users", async () => {
    const index = await store.index();
    expect(index.length).toBeGreaterThan(1);
  });

  it("Calling get user should return requested user", async () => {
    const returnedUser = await store.getUser(user.id as unknown as string);
    expect(returnedUser.id).toBe(user.id);
    expect(returnedUser.first_name).toBe(user.first_name);
    expect(returnedUser.last_name).toBe(user.last_name);
    expect(returnedUser.username).toBe(user.username);
  });

  it("Updating a user returns the new updated user info", async () => {
    const update = await store.updateUser({ ...user, username: "Updated!" });
    expect(update.username).toBe("Updated!");
  });

  it("Delete method deletes user", async () => {
    const deleted = await store.deleteUser(user.id as unknown as string);
    expect(deleted.id).toBe(user.id);
  });
});
