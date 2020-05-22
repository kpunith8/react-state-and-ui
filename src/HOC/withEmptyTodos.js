import React from "react";

const withEmptyTodos = Component => props => {
  return props.todos.length === 0 ? (
    <p>No Todos available!</p>
  ) : (
    <Component {...props} />
  );
};

export default withEmptyTodos;
