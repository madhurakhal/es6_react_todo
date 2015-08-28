import {Dispatcher} from 'flux';
import ToDoStore from '../store/ToDoStore';

let ToDoDispatcher = new Dispatcher();

ToDoDispatcher.register((payload) => {
  switch(payload.action) {
    case 'add':
    ToDoStore.addTodo(payload.todo);
    break;

    case 'toggle':
    ToDoStore.toggleTodo(payload.todo.id);
    break;

    case 'clear':
    ToDoStore.clearAll();
    break;
    default:
    return true;
  }
  ToDoStore.emitChange();
});


export default ToDoDispatcher;