import React, { useState } from "react";

export let ReturnItems = (sourceColumn:any) => {
const [sourceColumns, setSourceColumns] = useState([]);
const [destColumns, setDestColumns] = useState([]);

return sourceColumn;
}
export let itemsFromBackend = [
  { id: "1", content: "First task", description: "description 1st task", column: 1 },
  { id: "2", content: "Second task", description: "description 2nd task" , column: 1},
  { id: "3", content: "Third task", description: "description 3rd task" , column: 1},
  { id: "4", content: "Fourth task", description: "description 4th task" , column: 1}
];

export let columnsFromBackend = {
  [1]: {
    name: "To do",
    items: itemsFromBackend,
  },
  [2]: {
    name: "In Progress",
    items: [],
  },
  [3]: {
    name: "Done",
    items: [],
  },
};






export const onDragEnd = (
  result: Record<string, any>,
  columns: Record<string, any>,
  setColumns: Function
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    destItems.forEach((item) => {item.column = destination.droppableId})
    
    console.log("destItems", destItems)

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

