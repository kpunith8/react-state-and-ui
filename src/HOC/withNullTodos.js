import React from "react";

const withNullTodos = Component => props => {
  return !props.todos ? null : <Component {...props} />;
};

export default withNullTodos;
