import React, { useRef, useState } from "react";
import "./style.css";

type TDraggableListItem = {
  id: string;
  name: string;
};

const DraggableList = ({ items }: { items: TDraggableListItem[] }) => {
  const [list, setList] = useState(items);

  const dragFromPosition = useRef(-1);
  const targetPosition = useRef(-1);

  const onDragStart = (event: React.DragEvent, index: number) => {
    dragFromPosition.current = index;
    event.currentTarget.classList.add("element-is-being-dragged");
  };
  const onDragEnter = (_event: React.DragEvent, index: number) => {
    targetPosition.current = index;
  };

  const onDragOver = (event: React.DragEvent, index: number) => {
    const boundingRectangle = event.currentTarget.getBoundingClientRect();
    const center = boundingRectangle.top + boundingRectangle.height / 2;

    if (event.pageY < center) {
      event.currentTarget.classList.add("element-drags-to-top");
      event.currentTarget.classList.remove("element-drags-to-bottom");

      targetPosition.current = index;
    } else {
      event.currentTarget.classList.add("element-drags-to-bottom");
      event.currentTarget.classList.remove("element-drags-to-top");

      targetPosition.current = index + 1;
    }
  };

  const onDragLeave = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("element-drags-to-top");
    event.currentTarget.classList.remove("element-drags-to-bottom");
  };

  const onDragEnd = (event: React.DragEvent) => {
    const currentItem = list[dragFromPosition.current];
    event.currentTarget.classList.remove("element-is-being-dragged");

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
        <li
          key={id}
          onDragStart={(event) => onDragStart(event, index)}
          onDragEnter={(event) => onDragEnter(event, index)}
          onDragEnd={onDragEnd}
          onDragLeave={onDragLeave}
          onDragOver={(event) => onDragOver(event, index)}
          draggable
          className="DraggableListItem"
        >
          {name}
        </li>
      ))}
    </ol>
  );
};

export default DraggableList;
