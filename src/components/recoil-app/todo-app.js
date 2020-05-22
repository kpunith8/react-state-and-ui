import React, { useState } from "react";
import { v4 } from "uuid";
import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  selector
} from "recoil";
import "./todo-app.css";

const todoListState = atom({
  key: "todoListState",
  default: JSON.parse(localStorage.getItem("todos")) || []
});

const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All"
});

const filteredTodoListState = selector({
  key: "filteredTodoListState",

  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter(item => item.isComplete);
      case "Show Uncompleted":
        return list.filter(item => !item.isComplete);
      default:
        return list;
    }
  }
});

const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(filteredTodoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter(item => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted
    };
  }
});

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    if (inputValue.length > 0) {
      setTodoList(oldTodoList => {
        const newState = [
          ...oldTodoList,
          {
            id: v4(),
            text: inputValue,
            isComplete: false
          }
        ];
        setInputValue("");
        localStorage.setItem("todos", JSON.stringify(newState));
        return newState;
      });
    }
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div className="todo-list">
      <h1 className="title">Rocoil-Todo-App</h1>
      <input type="text" value={inputValue} onChange={onChange} />
      <button className="add" onClick={addItem}>
        Add
      </button>

      <h2 className="list-name">TO-DO Items</h2>
    </div>
  );
};

const TodoItem = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex(listItem => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div className="list-item">
      <input
        type="text"
        value={item.text}
        onChange={editItemText}
        disabled={item.isComplete}
      />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button className="delete" onClick={deleteItem}>
        Delete
      </button>
    </div>
  );
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

const TodoListStats = () => {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul
      style={{
        listStyle: "none",
        left: 0,
        display: "flex",
        flexDirection: "column",
        padding: 0
      }}
    >
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
};

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map(todoItem => (
        <TodoItem item={todoItem} key={todoItem.key} />
      ))}
    </>
  );
};

export default TodoList;
