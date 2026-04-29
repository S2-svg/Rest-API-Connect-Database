import mysql from "mysql2/promise";

export class Database {
  static pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "users",
  });

  static async connect() {
    try {
      const connection = await this.pool.getConnection();
      console.log("Connected to MySQL!");
      connection.release();
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
}

export default Database;