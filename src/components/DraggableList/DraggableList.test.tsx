import React from "react";
import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DraggableList from "./DraggableList";

const defaultProps = {
  onReorderItem: (_fromIndex: number, _toIndex: number) => null,
  onRemoveItem: (_indexToRemove: number) => null,
  onHoverItem: (_index: number) => null,
  onDimItem: (_index: number) => null,
};

test("renders a list", () => {
  render(
    <DraggableList
      {...defaultProps}
      list={["Hello", "World", "Foo", "Bar"]}
    ></DraggableList>
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
      {...defaultProps}
      list={list}
      onRemoveItem={callback}
    ></DraggableList>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const firstChildElement = screen.getByText(/Hello/i).closest("li");
  expect(firstChildElement).toBeInTheDocument();

  // eslint-disable-next-line testing-library/prefer-screen-queries
  await user.click(getByText(firstChildElement as HTMLLIElement, "Delete"));

  expect(callback).toHaveBeenCalledWith(list.indexOf("Hello"));
});
