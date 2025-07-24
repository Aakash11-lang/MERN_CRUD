class QueryHelpers {
  async getAll(Model) {
    return await Model.find({});
  }

  async getById(Model, id) {
    return await Model.findById(id);
  }

  async create(Model, data) {
    return await Model.create(data);
  }

  async updateById(Model, id, data) {
    return await Model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(Model, id) {
    return await Model.findByIdAndDelete(id);
  }
}

export default new QueryHelpers();