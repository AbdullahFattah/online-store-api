import Order from "../types/order_types";
import Client from "../database";

class OrderModel {
  async createOrder(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *";
      const result = await conn.query(sql, ["Active", o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order:${(err as Error).message}`);
    }
  }

  async ordersIndex(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to view orders: ${(err as Error).message}`);
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to view user: ${(err as Error).message}`);
    }
  }

  //   Check this one
  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
export default OrderModel;
