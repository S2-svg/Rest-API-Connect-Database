import User from "../models/userModel.js";

export class UserController {
  // GET /users
  static async getUsers(req, res) {
    try {
      const users = await User.getAll();
      return res.json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // POST /users
  static async createUser(req, res) {
    try {
      const { employee_id, employee_name } = req.body;

      if (!employee_name) {
        return res.status(400).json({ 
          success: false,
          message: "employee_name is required" });
      }

      const newUser = await User.create({ employee_id, employee_name });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // PUT /users/:id
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { employee_name } = req.body;

      if (!employee_name) {
        return res.status(400).json({ 
          success: false,
          message: "employee_name is required" });
      }

      const result = await User.update(id, employee_name);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.json({
        success: true,
        message: "User updated successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE /users/:id
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await User.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default UserController;
