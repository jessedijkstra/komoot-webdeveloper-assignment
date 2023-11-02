import React from "react";
import {
  getByAltText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DraggableList from "./DraggableList";

test("renders a list", () => {
  render(
    <DraggableList list={["Hello", "World", "Foo", "Bar"]}></DraggableList>
  );

  const firstChildElement = screen.getByText(/Hello/i);
  expect(firstChildElement).toBeInTheDocument();

  const secondChildElement = screen.getByText(/World/i);
  expect(secondChildElement).toBeInTheDocument();
});

test("removes a list item", async () => {
  const user = userEvent;
  let list = ["Hello", "World", "Foo", "Bar"];

  render(
    <DraggableList
      list={list}
      onRemove={(index) => index}
      onReposition={(_fromIndex, _toIndex) => null}
    ></DraggableList>
  );

  const firstChildElement = screen.getByText(/Hello/i).closest("li");
  expect(firstChildElement).toBeInTheDocument();

  await user.click(getByText(firstChildElement as HTMLLIElement, "Delete"));

  expect(list).not.toContain({ name: "Hello", id: "hello" });
});
