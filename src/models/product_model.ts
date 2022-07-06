import Product from "../types/product_types";
import Client from "../database";

class ProductModel {
  // Create
  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO products(name, price) values ($1,$2) RETURNING *`;
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create product:${(err as Error).message}`);
    }
  }

  // Index
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to view products:${(err as Error).message}`);
    }
  }

  // Show product
  async showProduct(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to view requested product:${(err as Error).message}`
      );
    }
  }

  // Delete product
  async deleteProduct(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to delete requested product:${(err as Error).message}`
      );
    }
  }
}

export default ProductModel;
