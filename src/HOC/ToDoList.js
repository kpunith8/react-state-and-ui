import React from "react";

const TodoList = ({ todos, isLoading }) => {
  return todos.map(todo => (
    <ul>
      <li key={todo.id}>{todo.value}</li>
    </ul>
  ));
};

export default TodoList;
