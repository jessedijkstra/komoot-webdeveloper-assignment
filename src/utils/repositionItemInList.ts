
export default function repositionItemInList<T>(list: Array<T>, fromIndex: number, toIndex: number) {
    const currentItem = list[fromIndex];

    return [
        ...list.filter((value, index) => {
            return value !== currentItem && index < toIndex;
        }),
        currentItem,
        ...list.filter((value, index) => {
            return value !== currentItem && index >= toIndex;
        }),
    ];
}
