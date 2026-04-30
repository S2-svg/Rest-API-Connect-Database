import User from "../models/userModel.js";
import { Message } from "./BaseController.js";

export class UserController extends BaseController {
  // GET /users
  static async getUsers(req, res) {
    try {
      const users = await User.getAll();
      return this.successResponse(res, users, "Users retrieved successfully");
    } catch (error) {
      return this.errorResponse(res, error.message);
    }
  }

  // POST /users
  static async createUser(req, res) {
    try {
      const { employee_id, employee_name } = req.body;

      if (!employee_name) {
        return this.errorResponse(res, "employee_name is required", 400);
      }

      const newUser = await User.create({ employee_id, employee_name });
      return this.successResponse(res, newUser, "User created successfully");
    } catch (error) {
      return this.errorResponse(res, error.message, 500);
    }
  }

  // PUT /users/:id
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { employee_name } = req.body;

      if (!employee_name) {
        return this.errorResponse(res, "employee_name is required", 400);
      }

      const result = await User.update(id, employee_name);

      if (result.affectedRows === 0) {
        return this.errorResponse(res, "User not found", 404);
      }
      return this.successResponse(res, null, "User updated successfully");
    } catch (error) {
      return this.errorResponse(res, error.message, 500);
    }
  }

  // DELETE /users/:id
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await User.delete(id);

      if (result.affectedRows === 0) {
        return this.errorResponse(res, "User not found", 404);
      }
      return this.successResponse(res, null, "User deleted successfully");
    } catch (error) {
      return this.errorResponse(res, error.message, 500);
    }
  }
}

export default UserController;
