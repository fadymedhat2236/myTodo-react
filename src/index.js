import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let id = 0;

const Todo = props => (
  <li>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.toggle}
    />
    <button onClick={props.delete}> delete </button>
    <span>{props.todo.text}</span>
  </li>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  render() {
    return (
      <div>
        <div>Todo count: {this.state.todos.length}</div>
        <div>
          Unchecked todo count:{" "}
          {this.state.todos.filter(todo => !todo.checked).length}
        </div>
        <button onClick={() => this.addtodo()}>add todo</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              todo={todo}
              delete={() => this.removetodo(todo.id)}
              toggle={() => this.toggletodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    );
  }

  addtodo() {
    const text = prompt("enter a new todo");
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: id++,
          text: text,
          checked: false
        }
      ]
    });
  }

  removetodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggletodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
