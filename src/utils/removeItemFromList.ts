export default function removeIndexFromList<T>(list: T[], indexToRemove: number) {
    return list.filter((_item, index) => index !== indexToRemove);
} 