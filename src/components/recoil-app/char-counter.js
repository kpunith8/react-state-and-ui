import React from "react";
import { atom, useRecoilState, selector, useRecoilValue } from "recoil";

// An atom represents a piece of state.
// Atoms can be read from and written to from any component.
// Components that read the value of an atom are implicitly subscribed to that atom,
// so any atom updates will result in a re-render of all components subscribed to that atom:
const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "" // default value (aka initial value)
});

const TextInput = () => {
  // use the hook useRecoilState to read and update the state
  const [text, setText] = useRecoilState(textState);

  const onChange = event => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
};

// To get the derived state from the actual state
const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  }
});

const CharacterCount = () => {
  // useRecoilHook can be used to read the derived state from selector
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
};

const CharCounter = () => (
  <div>
    <h2>Recoil State Management Library </h2>
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  </div>
);

export default CharCounter;
