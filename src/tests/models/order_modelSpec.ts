import OrderModel from "../../models/order_model";

const store = new OrderModel();

describe("Product model", () => {
  describe("Check the model methods", () => {
    it("Should be able to get orders index", () => {
      expect(store.ordersIndex).toBeDefined();
    });
    it("Should get a specific order", () => {
      expect(store.getOrder).toBeDefined();
    });
    it("Should be able to place a new order", () => {
      expect(store.createOrder).toBeDefined();
    });
    it("Should add a product to an existing order", () => {
      expect(store.addProduct).toBeDefined();
    });
  });
});
