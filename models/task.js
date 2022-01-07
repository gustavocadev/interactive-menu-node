const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  description = "";
  createdAt = null;

  constructor(description) {
    this.description = description;
    this.id = uuidv4();
    this.createdAt = null;
  }
}

module.exports = Task;
