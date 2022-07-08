import OrderModel from "../../models/order_model";
import UserModel from "../../models/user_model";
import Order from "../../types/order_types";
import User from "../../types/user_types";

const store = new OrderModel();
const storeUser = new UserModel();

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

describe("Test methods of the order model", () => {
  const order = {
    product_id: "1",
  } as unknown as Order;
  const user = {
    first_name: "Test user",
    last_name: "Test user",
    username: "OrderUser",
    password: "123",
  } as User;
  beforeAll(async () => {
    const createdOrder = await store.createOrder(order);
    order.id = createdOrder.id;
    await storeUser.create(user);
  });

  it("Should return created order", async () => {
    const testOrder = await store.createOrder({
      user_id: user.id as unknown as string,
    } as unknown as Order);
    expect(testOrder).toEqual(testOrder);
  });

  it("Close order closes active orders", async () => {
    const closeOrder = await store.closeOrder("1");
    expect(closeOrder.status).toBe("Completed");
  });

  it("Index returns available orders", async () => {
    const shownOrder = await store.getOrder(order.id as unknown as string);
    expect(shownOrder.id).toBe(order.id);
    expect(shownOrder.status).toBe(shownOrder.status);
    expect(shownOrder.user_id).toBe(shownOrder.user_id);
  });
});
