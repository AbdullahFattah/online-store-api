import User from "../types/user_type";
import Client from "../database";
class UserModel {
  // Create
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO users (first_name, last_name, username, password)
        values ($1, $2, $3, $4) returning id, first_name, last_name, username`;
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        u.password,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create user:${(err as Error).message}`);
    }
  }
  // Get users
  async getUsers(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT id, first_name, last_name, username from users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to fetch users (${(err as Error).message})`);
    }
  }
  // Get use
  async getUser(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT id, first_name, last_name, username FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to fetch user (${(err as Error).message})`);
    }
  }
  // Update user
  async updateUser(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE users SET first_name=$1, last_name=$2, username=$3, password=$4
        WHERE id = $5
        RETURNING id, first_name, last_name, username`;
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        u.password,
        u.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to update user (${(err as Error).message})`);
    }
  }
  // Delete user
  async deleteUser(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM users WHERE id=($1)
        RETURNING id, first_name, last_name, username`;
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to delete user (${(err as Error).message})`);
    }
  }
  // Authenticate user
}

export default UserModel;