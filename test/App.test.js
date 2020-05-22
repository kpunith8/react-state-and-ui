import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "../src/App";
import Search from "../src/Search";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("Search has a valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
