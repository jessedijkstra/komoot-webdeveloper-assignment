import React, { useRef, useState } from "react";
import "./style.css";

type TDraggableListItem = {
  id: string;
  name: string;
};

type DraggableListItemProps = React.PropsWithChildren<{
  index: number;
  onDragStart: (index: number) => any;
  onDragOver: (index: number) => any;
  onDragEnter: (index: number) => any;
  onDragEnd: (index: number) => any;
}>;

const DraggableListItem = ({
  children,
  index,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragEnd,
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
      {children}
    </li>
  );
};

const DraggableList = ({ items }: { items: TDraggableListItem[] }) => {
  const [list, setList] = useState(items);

  const dragFromPosition = useRef(-1);
  const targetPosition = useRef(-1);

  const onDragStart = (index: number) => {
    dragFromPosition.current = index;
  };

  const onDragEnter = (index: number) => {
    targetPosition.current = index;
  };

  const onDragOver = (index: number) => {
    targetPosition.current = index;
  };

  const onDragEnd = () => {
    const currentItem = list[dragFromPosition.current];

    if (currentItem) {
      const newList = [
        ...list.filter((value, index) => {
          return value !== currentItem && index < targetPosition.current;
        }),
        currentItem,
        ...list.filter((value, index) => {
          return value !== currentItem && index >= targetPosition.current;
        }),
      ];

      setList(newList);
    }
  };

  return (
    <ol className="DraggableList" data-testid="DraggableList">
      {list.map(({ name, id }, index) => (
        <DraggableListItem
          key={id}
          index={index}
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          {name}
        </DraggableListItem>
      ))}
    </ol>
  );
};

export default DraggableList;
