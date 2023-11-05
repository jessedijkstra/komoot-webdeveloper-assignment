export default function reorderItemInList<T>(
  list: Array<T>,
  fromIndex: number,
  toIndex: number
) {
  const currentItem = list[fromIndex];

  if (fromIndex === toIndex) {
    return [...list];
  }

  return list.reduce((result, item, index) => {
    if (index === fromIndex) {
      return result;
    }

    if (index === toIndex && fromIndex < toIndex) {
      return [...result, item, currentItem];
    }

    if (index === toIndex && fromIndex > toIndex) {
      return [...result, currentItem, item];
    }

    return [...result, item];
  }, [] as T[]);
}
