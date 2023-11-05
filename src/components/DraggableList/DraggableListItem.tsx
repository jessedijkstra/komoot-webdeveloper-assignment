import React from "react";
import classNames from "classnames";

type DraggableListItemProps = React.PropsWithChildren<{
  index: number;
  hilight: boolean;
  onDragStart: (index: number) => any;
  onDragOver: (index: number) => any;
  onDragEnter: (index: number) => any;
  onDragEnd: (index: number) => any;
  onDelete: (index: number) => any;
  onMouseEnter: (index: number) => any;
  onMouseLeave: (index: number) => any;
}>;

const DraggableListItem = ({
  children,
  index,
  hilight,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragEnd,
  onDelete,
  onMouseEnter,
  onMouseLeave,
}: DraggableListItemProps) => {
  const handleDragStart = (event: React.DragEvent, index: number) => {
    event.currentTarget.classList.add("is-dragged");

    onDragStart(index);
  };

  const handleDragOver = (event: React.DragEvent, index: number) => {
    const boundingRectangle = event.currentTarget.getBoundingClientRect();
    const center = boundingRectangle.top + boundingRectangle.height / 2;

    if (event.pageY < center) {
      event.currentTarget.classList.add("has-element-dragged-to-top");
      event.currentTarget.classList.remove("has-element-dragged-to-bottom");

      onDragOver(Math.max(0, index - 1));
    } else {
      event.currentTarget.classList.add("has-element-dragged-to-bottom");
      event.currentTarget.classList.remove("has-element-dragged-to-top");

      onDragOver(index);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("has-element-dragged-to-top");
    event.currentTarget.classList.remove("has-element-dragged-to-bottom");
  };

  const handleDragEnd = (event: React.DragEvent) => {
    event.currentTarget.classList.remove("is-dragged");

    onDragEnd(index);
  };

  return (
    <li
      onDragStart={(event) => handleDragStart(event, index)}
      onDragEnter={(_event) => onDragEnter(index)}
      onDragEnd={handleDragEnd}
      onDragLeave={handleDragLeave}
      onDragOver={(event) => handleDragOver(event, index)}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave(index)}
      draggable
      className={classNames("DraggableListItem", { "is-hilighted": hilight })}
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

export default DraggableListItem;
