import Database from "../config/db.js";

export class User {
  // Get all users
  static async getAll() {
    const [rows] = await Database.pool.query("SELECT * FROM employees");
    return rows;
  }

  // Create user
  static async create({ employee_id, employee_name }) {
    let sql;
    let params;

    if (employee_id != null) {
      sql = "INSERT INTO employees (employee_id, employee_name) VALUES (?, ?)";
      params = [employee_id, employee_name];
    } else {
      sql = "INSERT INTO employees (employee_name) VALUES (?)";
      params = [employee_name];
    }

    const [result] = await Database.pool.query(sql, params);

    return {
      employee_id: employee_id ?? result.insertId,
      employee_name,
    };
  }

  // Update user
  static async update(id, employee_name) {
    const [result] = await Database.pool.query(
      "UPDATE employees SET employee_name = ? WHERE employee_id = ?",
      [employee_name, id],
    );

    return result;
  }

  // Delete user
  static async delete(id) {
    const [result] = await Database.pool.query(
      "DELETE FROM employees WHERE employee_id = ?",
      [id],
    );

    return result;
  }
}

export default User;