
export default function replaceItemInList<T>(list: Array<T>, index: number, value: T) {
    return [
        ...list.slice(0, index),
        value,
        ...list.slice(index + 1)
    ];
}
