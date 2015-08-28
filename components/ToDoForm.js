import React from 'react';
import {Button} from 'react-bootstrap';
import ToDoDispatcher from '../dispatcher/ToDoDispatcher';
import ToDoStore from '../store/ToDoStore';

export default class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
  }
  _clearAllTodos(e) {
    e.preventDefault();
    ToDoDispatcher.dispatch({
      action: 'clear',
      todo: {
      }
    });
  }

  _createTodo(e) {
    e.preventDefault();
    const name = React.findDOMNode(this.refs.todo_name).value;
    if(name.trim() == '') return;

    ToDoDispatcher.dispatch({
      action: 'add',
      todo: {
        id: ToDoStore.getTodos().length,
        name: name,
        completed: false
      }
    });

    React.findDOMNode(this.refs.todo_name).value = '';
  }
  render() {
    return (
      <form onSubmit={this._createTodo.bind(this)}>
        <input type="text" ref="todo_name" className="form-control add-todo" placeholder="Add Todo"/>
        <Button bsStyle="danger"
                bsSize="small" type="button" id="clear-todo" onClick={this._clearAllTodos}> Clear All </Button>
        <Button bsStyle="success"
                bsSize="small" type="submit" id="create-todo"> Add </Button>
      </form>
      )
  }
}
