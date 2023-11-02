import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DraggableList from "./components/DraggableList/DraggableList";

const App = () => {
  const [itemList, setItemList] = useState([
    { name: "Hello", id: "hello" },
    { name: "World", id: "world" },
    { name: "Foo", id: "foo" },
    { name: "Bar", id: "bar" },
  ]);

  const handleListChange = (newList: Array<{ id: string; name: string }>) => {
    setItemList(newList);
  };

  return (
    <div className="App">
      <aside>
        <h1 className="logo">komoot</h1>
        <h2>Route Builder</h2>
        <DraggableList
          list={itemList}
          onListChange={handleListChange}
        ></DraggableList>
      </aside>
    </div>
  );
};

export default App;
