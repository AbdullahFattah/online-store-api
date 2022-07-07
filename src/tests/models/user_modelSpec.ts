import UserModel from "../../models/user_model";

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
