import React from "react";
import { render, screen } from "@testing-library/react";
import DraggableList from "./DraggableList";

test("renders a list", () => {
  render(
    <DraggableList
      items={[
        { name: "Hello", id: "hello" },
        { name: "World", id: "world" },
        { name: "Foo", id: "foo" },
        { name: "Bar", id: "bar" },
      ]}
    ></DraggableList>
  );

  const firstChildElement = screen.getByText(/Hello/i);
  expect(firstChildElement).toBeInTheDocument();

  const secondChildElement = screen.getByText(/World/i);
  expect(secondChildElement).toBeInTheDocument();
});
