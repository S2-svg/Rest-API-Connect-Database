import express from "express";
import mysql from "mysql2";
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

db.getConnection((err) => {
  if (err) {
    console.log("Error:", err);
    return;
  }
  console.log("Connected to MySQL!");
});
export default db;

const app = express();
app.use(express.json());
let users = [];

//Get User
app.get("/users", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//Create User
app.post("/users", (req, res) => {
  const { employee_id, employee_name } = req.body;
  if (!employee_name) {
    return res.status(400).json({ error: "employee_name is required" });
  }

  let sql;
  let params;
  if (employee_id != null) {
    sql = "INSERT INTO employees (employee_id, employee_name) VALUES (?, ?)";
    params = [employee_id, employee_name];
  } else {
    sql = "INSERT INTO employees (employee_name) VALUES (?)";
    params = [employee_name];
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({
      employee_id: employee_id != null ? employee_id : result.insertId,
      employee_name,
    });
  });
});

//update users
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { employee_name } = req.body;
  if (!employee_name) {
    return res.status(400).json({ error: "employee_name is required" });
  }
  db.query(
    "UPDATE employees SET employee_name = ? WHERE employee_id = ?",
    [employee_name, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }
      res.send("User updated successfully");
    },
  );
});

//Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM employees WHERE employee_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }
      res.send("User deleted successfully");
    },
  );
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
