import supertest from "supertest";
import Order from "../../../types/order_types";
import app from "../../../index";

const request = supertest(app);

describe("Order API endpoints", () => {
  describe("Test connection to orders endpoint", () => {
    it("Should connect and return status code 200", async () => {
      const response = await request.post("/api/orders");
      expect(response.status).toBe(200);
    });
  });
  describe("Orders CRUD functionality", () => {
    it("Should be able to create a new order", async () => {
      const response = await request
        .post("/api/orders")
        .set("Content-type", "application/json")
        .send({
          user_id: "2",
        } as Order);
      expect(response.status).toBe(200);
    });
  });
});
