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
  removeTodo(todo_id) {
    let todos = this.todos;
    _.remove(todos, (todo) => {
      return todo_id == todo.id;
    });
  },
  toggleTodo(id) {
    let todo = this.todos.filter((todo) => todo.id == id)[0];
    todo.completed = !todo.completed;
  },
  clearAll() {
    this.todos = [];
  },
  addChangeListener(callback) {
    this.on('change', callback)
  },
  removeChangeListerner(callback) {
    this.removeListener('change', callback);
  },
  emitChange(callback) {
    this.emit('change', callback);
  }
});
export default ToDoStore;