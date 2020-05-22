import React from "react";
import WithNullTodos from "../src/HOC/withNullTodos";
import WithEmptyTodos from "../src/HOC/withEmptyTodos";
import WithLoading from "../src/HOC/WithLoading";
import Todos from "../src/HOC/ToDoList";

// compose multiple HOC's to compose

const TodosWithEmptyList = WithEmptyTodos(Todos);
const TodosWithNull = WithNullTodos(TodosWithEmptyList);
const TodosWithLoading = WithLoading(TodosWithNull);

// Above can be refactored to
const TodoListWithConditionalRendering = WithLoading(
  WithNullTodos(WithEmptyTodos(Todos))
);

// Same can be achieved with `recompose` library
/*
import { compose } from 'recompose';
const withConditionalRenderings = compose(
  WithLoading,
  WithNullTodos,
  WithEmptyTodos
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);
*/

const HOCTest = props => <TodoListWithConditionalRendering {...props} />;

export default HOCTest;
