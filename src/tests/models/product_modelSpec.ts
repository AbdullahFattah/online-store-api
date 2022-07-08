import ProductModel from "../../models/product_model";
import Product from "../../types/product_types";

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

describe("Test methods for products model", () => {
  const product = {
    name: "Test product",
    price: "1000",
  } as unknown as Product;

  beforeAll(async () => {
    const testProduct = await store.create(product);
    product.id = testProduct.id;
  });

  it("Add product method returns added product", async () => {
    const testProduct = await store.create({
      name: "Test product",
      price: parseInt("1000"),
    } as unknown as Product);
    expect(testProduct).toEqual({
      id: testProduct.id,
      name: "Test product",
      price: parseInt("1000"),
    } as unknown as Product);
  });

  it("Index method views all products", async () => {
    const index = await store.index();
    expect(index.length).toBeGreaterThan(1);
  });

  it("Calling show product returns requested product", async () => {
    const returnedProduct = await store.showProduct(
      product.id as unknown as string
    );
    expect(returnedProduct.id).toBe(product.id);
  });

  it("Delete product removes the product", async () => {
    const deleted = await store.deleteProduct(product.id as unknown as string);
    expect(deleted.id).toBe(product.id);
  });
});
