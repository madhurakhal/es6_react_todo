import {EventEmitter} from 'events';
import _ from 'lodash';

var ToDoStore = _.extend({}, EventEmitter.prototype, {
  todos: [],
  getTodos() {
    return this.todos;
  },
  addTodo(newTodo) {
    this.todos.push(newTodo);
  },
  removeTodo(id) {
    _.remove(this.todos,  (todo) => todo.id == id);
  },
  toggleTodo(id) {
    const todo = _.find(this.todos, (todo) => todo.id == id);
    todo.completed = !todo.completed;
  },
  clearAll() {
    this.todos = [];
  },
  addChangeListener(callback) {
    this.on('change', callback)
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },
  emitChange(callback) {
    this.emit('change', callback);
  }
});
export default ToDoStore;
