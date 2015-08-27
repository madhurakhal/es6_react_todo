import {Dispatcher} from 'flux';
import ToDoStore from '../store/ToDoStore';

let ToDoDispatcher = new Dispatcher();

ToDoDispatcher.register((playload) => {
  switch(playload.action) {
    case 'add':
    ToDoStore.addTodo(playload.todo);
    break;

    case 'toggle':
    ToDoStore.toggleTodo(playload.todo.id);
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