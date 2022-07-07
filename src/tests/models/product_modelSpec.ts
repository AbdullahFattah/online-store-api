import ProductModel from "../../models/product_model";

const store = new ProductModel();

describe("Product model", () => {
  describe("Check the model methods", () => {
    it("Should be able to get products index", () => {
      expect(store.index).toBeDefined();
    });
    it("Should be able to show a specific product", () => {
      expect(store.showProduct).toBeDefined();
    });
    it("Should be able to create a new product", () => {
      expect(store.create).toBeDefined();
    });
    store;
    it("Should be able to delete a product", () => {
      expect(store.deleteProduct).toBeDefined();
    });
  });
});
