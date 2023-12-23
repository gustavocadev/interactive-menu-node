import { v4 as uuidv4 } from 'uuid';

class Task {
  id = '';
  description = '';
  createdAt = null;

  constructor(description) {
    this.description = description;
    this.id = uuidv4();
    this.createdAt = null;
  }
}

export default Task;
