import React from 'react';
import ToDoDispatcher from '../dispatcher/ToDoDispatcher';
import ToDoStore from '../store/ToDoStore';
import ToDoForm from './ToDoForm';

export default class ToDo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      todos: ToDoStore.getTodos()
    };
    this._onChange = () => {
      this.setState({todos: ToDoStore.getTodos()});
    }
  }
  componentDidMount() {
    ToDoStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    ToDoStore.removeChangeListener(this._onChange);
  }
  _toggleTodo(evt) {
    ToDoDispatcher.dispatch({
      action: 'toggle',
      todo: {
        id: evt.target.value
      }
    });
  }
  render() {
    let lists = this.state.todos.map((todoItem, idx) => {
      return(<li className="ui-state-default" key={todoItem.id}>
              <div className="checkbox">
                <label>
                    <input type="checkbox" defaultChecked={todoItem.completed}
                    value={todoItem.id}
                    onChange={this._toggleTodo}
                    /><span>{todoItem.name}</span>
                </label>
              </div>
            </li>);
    })
    const todosLeft = this.state.todos.filter(todo => !todo.completed).length;
    const todoText = "Todo" + ((todosLeft !== 1) ? "s" : "");
    return (
        <div className="todolist not-done">
          <h1>Todos</h1>
          <ToDoForm/>
          <hr />
          <ul id="sortable" className="list-unstyled">
            {lists}
          </ul>
          <div className="todo-footer">
            <strong>
              <span className="count-todos">{todosLeft}</span>
            </strong> {todoText} Left
          </div>
        </div>
      )
  }
}
