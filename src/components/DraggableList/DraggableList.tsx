import React, { useRef } from "react";
import "./style.css";
import classNames from "classnames";
import DraggableListItem from "./DraggableListItem";

type DraggableListProps<T> = React.PropsWithRef<{
  list: string[];
  hilightIndex?: number;
  onReorderItem: (fromIndex: number, toIndex: number) => any;
  onRemoveItem: (indexToRemove: number) => any;
  onHoverItem: (index: number) => any;
  onDimItem: (index: number) => any;
}>;

function DraggableList<T>({
  list,
  hilightIndex,
  onRemoveItem,
  onReorderItem,
  onHoverItem,
  onDimItem,
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

  return (
    <ol className="DraggableList" data-testid="DraggableList">
      {list.map((label, index) => (
        <DraggableListItem
          key={index}
          index={index}
          hilight={hilightIndex === index}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={() =>
            onReorderItem(dragFromPosition.current, targetPosition.current)
          }
          onDragOver={handleDragOver}
          onDelete={onRemoveItem}
          onMouseEnter={onHoverItem}
          onMouseLeave={onDimItem}
        >
          {label}
        </DraggableListItem>
      ))}
    </ol>
  );
}

export default DraggableList;
