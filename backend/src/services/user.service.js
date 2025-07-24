import axios from "axios";

import User from "../models/user.model.js";
import queryHelpers from "../helpers/query.helpers.js";

class UserService {
  async getAllUsers() {
    return await queryHelpers.getAll(User);
  }

  async getUserById(id) {
    return await queryHelpers.getById(User, id);
  }

  async createUser(data) {
    return await queryHelpers.create(User, data);
  }

  async updateUser(id, data) {
    return await queryHelpers.updateById(User, id, data);
  }

  async deleteUser(id) {
    return await queryHelpers.deleteById(User, id);
  }
}

export default new UserService();
