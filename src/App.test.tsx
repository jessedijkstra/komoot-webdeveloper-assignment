import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders a list", () => {
  render(<App></App>);

  const draggableListElement = screen.getByTestId("DraggableList");
  expect(draggableListElement).toBeInTheDocument();
});
