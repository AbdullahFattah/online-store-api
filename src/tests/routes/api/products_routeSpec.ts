import supertest from "supertest";
import ProductModel from "../../../models/product_model";
import Product from "../../../types/product_types";
import app from "../../../index";

const store = new ProductModel();
const request = supertest(app);

describe("Product API endpoints", () => {
  const product = {
    name: "Test product",
    price: "1000",
  } as unknown as Product;

  beforeAll(async () => {
    const testProduct = await store.create(product);
    product.id = testProduct.id;
  });

  describe("Test endpoint connection", () => {
    it("Should connect and return status code 200", async () => {
      const response = await request.get("/api/products");
      expect(response.status).toBe(200);
    });
  });
  describe("Products CRUD functionality", async () => {
    it("Should be able to get index of products", async () => {
      const response = await request
        .get("/api/products")
        .set("Content-type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.length).not.toEqual(null || undefined);
    });

    it("Should be able to get a product by id", async () => {
      const response = await request
        .get(`/api/products/2`)
        .set("Content-type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.name).not.toBe(null || undefined);
      expect(response.body.price).not.toBe(null || undefined);
    });
  });
});
