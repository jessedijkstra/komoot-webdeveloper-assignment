import React from "react";
import { getByText, render, screen } from "@testing-library/react";
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
  const list = ["Hello", "World", "Foo", "Bar"];
  const callback = jest.fn();
  render(
    <DraggableList
      list={list}
      onRemoveItem={callback}
      onReorderItem={(_fromIndex, _toIndex) => null}
    ></DraggableList>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const firstChildElement = screen.getByText(/Hello/i).closest("li");
  expect(firstChildElement).toBeInTheDocument();

  // eslint-disable-next-line testing-library/prefer-screen-queries
  await user.click(getByText(firstChildElement as HTMLLIElement, "Delete"));

  expect(callback).toHaveBeenCalledWith(list.indexOf("Hello"));
});
