import Database from "../config/db.js";
import { BaseModel } from "./BaseModel.js";

export class Product extends BaseModel {
  async get() {
    const [rows] = await Database.pool.query("SELECT * FROM products");
    return rows;
  }

  async find(id) {
    const [rows] = await Database.pool.query(
      "SELECT * FROM products WHERE product_id = ?",
      [id],
    );

    return rows[0] ?? null;
  }

  async create({ product_name, product_price }) {
    const [result] = await Database.pool.query(
      "INSERT INTO products (product_name, product_price) VALUES (?, ?)",
      [product_name, product_price],
    );

    return {
      product_id: result.insertId,
      product_name,
      product_price,
    };
  }

  async update(id, { product_name, product_price }) {
    const [result] = await Database.pool.query(
      "UPDATE products SET product_name = ?, product_price = ? WHERE product_id = ?",
      [product_name, product_price, id],
    );

    return result;
  }

  async delete(id) {
    const [result] = await Database.pool.query(
      "DELETE FROM products WHERE product_id = ?",
      [id],
    );

    return result;
  }
}

export default new Product();
