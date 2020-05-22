import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import HOCTest from "./HOCTest";
import FormikForm from "./Formik-Form";
import EmotionUI from "./emotion/emotion-sample";
import RecoilApp from "./components/recoil-app/recoil-app";

const todos = [
  {
    id: 1,
    value: "Test the code"
  },
  {
    id: 2,
    value: "Another Item"
  }
];

// <HOCTest todos={todos} isLoading={false} />
const rootElement = document.getElementById("root");
ReactDOM.render(<RecoilApp />, rootElement);
