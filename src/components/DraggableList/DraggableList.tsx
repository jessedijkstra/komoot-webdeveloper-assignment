import React, { useRef } from "react";
import "./style.css";

type DraggableListItemProps = React.PropsWithChildren<{
  index: number;
  onDragStart: (index: number) => any;
  onDragOver: (index: number) => any;
  onDragEnter: (index: number) => any;
  onDragEnd: (index: number) => any;
  onDelete: (index: number) => any;
}>;

const DraggableListItem = ({
  children,
  index,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragEnd,
  onDelete,
}: DraggableListItemProps) => {
  const handleDragStart = (event: React.DragEvent, index: number) => {
    event.currentTarget.classList.add("element-is-being-dragged");

    onDragStart(index);
  };

  const handleDragOver = (event: React.DragEvent, index: number) => {
    const boundingRectangle = event.currentTarget.getBoundingClientRect();
    const center = boundingRectangle.top + boundingRectangle.height / 2;

    if (event.pageY < center) {
      event.currentTarget.classList.add("element-drags-to-top");
      event.currentTarget.classList.remove("element-drags-to-bottom");

      onDragOver(index);
    } else {
      event.currentTarget.classList.add("element-drags-to-bottom");
      event.currentTarget.classList.remove("element-drags-to-top");

      onDragOver(index + 1);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("element-drags-to-top");
    event.currentTarget.classList.remove("element-drags-to-bottom");
  };

  const handleDragEnd = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("element-is-being-dragged");

    onDragEnd(index);
  };

  return (
    <li
      onDragStart={(event) => handleDragStart(event, index)}
      onDragEnter={(_event) => onDragEnter(index)}
      onDragEnd={handleDragEnd}
      onDragLeave={handleDragLeave}
      onDragOver={(event) => handleDragOver(event, index)}
      draggable
      className="DraggableListItem"
    >
      <span className="DraggableListItemText">{children}</span>

      <button
        type="button"
        className="DeleteButton"
        onClick={(_event) => onDelete(index)}
      >
        Delete
      </button>
    </li>
  );
};

type DraggableListProps<T> = React.PropsWithRef<{
  list: string[];
  onReorderItem?: (fromIndex: number, toIndex: number) => any;
  onRemoveItem?: (indexToRemove: number) => any;
}>;

function DraggableList<T>({
  list,
  onRemoveItem: onRemove,
  onReorderItem: onReposition,
}: DraggableListProps<T>) {
  const dragFromPosition = useRef(-1);
  const targetPosition = useRef(-1);

  const handleDragStart = (index: number) => {
    dragFromPosition.current = index;
  };

  const handleDragEnter = (index: number) => {
    targetPosition.current = index;
  };

  const handleDragOver = (index: number) => {
    targetPosition.current = index;
  };

  const handleDragEnd = () => {
    onReposition &&
      onReposition(dragFromPosition.current, targetPosition.current);
  };

  const handleDelete = (indexToRemove: number) => {
    onRemove && onRemove(indexToRemove);
  };

  return (
    <ol className="DraggableList" data-testid="DraggableList">
      {list.map((label, index) => (
        <DraggableListItem
          key={index}
          index={index}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDelete={handleDelete}
        >
          {label}
        </DraggableListItem>
      ))}
    </ol>
  );
}

export default DraggableList;
