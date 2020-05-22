import React from "react";
import { RecoilRoot } from "recoil";
import CharCouter from "./char-counter";
import TodoList from "./todo-app";

const RecoilApp = () => {
  return (
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );
};

export default RecoilApp;
