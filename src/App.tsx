import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DraggableList from "./components/DraggableList/DraggableList";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <DraggableList
        items={[
          { name: "Hello", id: "hello" },
          { name: "World", id: "world" },
          { name: "Foo", id: "foo" },
          { name: "Bar", id: "bar" },
        ]}
      ></DraggableList>
    </div>
  );
}

export default App;
