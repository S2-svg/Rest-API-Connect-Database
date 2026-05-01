export class BaseModel {
  constructor() {
    if (new.target === BaseModel) {
      throw new Error("BaseModel is an abstract class and cannot be instantiated directly");
    }

    const requiredMethods = ["get", "find", "create", "update", "delete"];

    for (const method of requiredMethods) {
      if (this[method] === BaseModel.prototype[method]) {
        throw new Error(`Abstract method '${method}()' must be implemented`);
      }
    }
  }

  async get() {
    throw new Error("Method 'get()' must be implemented");
  }

  async find(id) {
    throw new Error("Method 'find(id)' must be implemented");
  }

  async create(data) {
    throw new Error("Method 'create(data)' must be implemented");
  }

  async update(id, data) {
    throw new Error("Method 'update(id, data)' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete(id)' must be implemented");
  }
}

export default BaseModel;
