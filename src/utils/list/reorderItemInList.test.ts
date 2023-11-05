import reorderItemInList from "./reorderItemInList";

test("reorders the list of the from is higher than the to", () => {
  const list = [0, 1, 2, 3, 4];
  const reorderedList = reorderItemInList(list, 2, 4);

  expect(list).toStrictEqual([0, 1, 2, 3, 4]);
  expect(reorderedList).toStrictEqual([0, 1, 3, 4, 2]);
});

test("reorders the list of the from is lower than the to", () => {
  const list = [0, 1, 2, 3, 4];
  const reorderedList = reorderItemInList(list, 2, 0);

  expect(list).toStrictEqual([0, 1, 2, 3, 4]);
  expect(reorderedList).toStrictEqual([2, 0, 1, 3, 4]);
});

test("reorders the list of the from is equal than the to", () => {
  const list = [0, 1, 2, 3, 4];
  const reorderedList = reorderItemInList(list, 2, 2);

  expect(list).toStrictEqual([0, 1, 2, 3, 4]);
  expect(reorderedList).toStrictEqual([0, 1, 2, 3, 4]);
  expect(reorderedList).not.toBe(list);
});
