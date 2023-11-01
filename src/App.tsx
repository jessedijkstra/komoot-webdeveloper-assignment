import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DraggableList from "./components/DraggableList/DraggableList";

function App() {
  return (
    <div className="App">
      <aside>
        <h1 className="logo">komoot</h1>
        <h2>Route Builder</h2>
        <DraggableList
          items={[
            { name: "Hello", id: "hello" },
            { name: "World", id: "world" },
            { name: "Foo", id: "foo" },
            { name: "Bar", id: "bar" },
          ]}
        ></DraggableList>
      </aside>
    </div>
  );
}

export default App;
