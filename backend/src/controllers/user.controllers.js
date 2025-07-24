import UserService from "../services/user.service.js";
import { successResponse, errorResponse } from "../helpers/response.helper.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return successResponse(res, {
        message: "Users fetched successfully",
        data: users,
        code: 200,
      });
    } catch (err) {
      return errorResponse(res, {
        message: "Failed to fetch users",
        data: err,
      });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user)
        return errorResponse(res, { message: "User not found", code: 404 });
      return successResponse(res, {
        message: "User fetched successfully",
        data: user,
        code: 200,
      });
    } catch (err) {
      return errorResponse(res, { message: "Error fetching user", data: err });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      return successResponse(res, {
        message: "User created successfully",
        code: 201,
        data: newUser,
      });
    } catch (err) {
      return errorResponse(res, { message: "User creation failed", data: err });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      return successResponse(res, {
        message: "User updated successfully",
        data: updatedUser,
        code: 200,
      });
    } catch (err) {
      return errorResponse(res, { message: "Update failed", data: err });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletededUser = await UserService.deleteUser(req.params.id);
      return successResponse(res, {
        message: "User deleted successfully",
        data: deletededUser,
        code: 200,
      });
    } catch (err) {
      return errorResponse(res, { message: "Deletion failed", data: err });
    }
  }

}

export default new UserController();