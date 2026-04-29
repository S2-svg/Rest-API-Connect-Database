import User from "../models/userModel.js";

export class UserController {
  // GET /users
  static async getUsers(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // POST /users
  static async createUser(req, res) {
    try {
      const { employee_id, employee_name } = req.body;

      if (!employee_name) {
        return res.status(400).json({ error: "employee_name is required" });
      }

      const newUser = await User.create({ employee_id, employee_name });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // PUT /users/:id
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { employee_name } = req.body;

      if (!employee_name) {
        return res.status(400).json({ error: "employee_name is required" });
      }

      const result = await User.update(id, employee_name);

      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }

      res.send("User updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // DELETE /users/:id
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await User.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }

      res.send("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default UserController;
