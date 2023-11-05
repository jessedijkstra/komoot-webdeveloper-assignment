import replaceItemInList from "./replaceItemInList";

test("replaces an item in a list and returns it as a new list by index", () => {
    const list = [1, 2, 3];

    const newList = replaceItemInList(list, 1, 5);

    expect(list).toStrictEqual([1, 2, 3]);
    expect(newList).toStrictEqual([1, 5, 3]);
});
