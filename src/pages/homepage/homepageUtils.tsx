/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { TaskCounterContext } from "../../contexts/taskCounterContext";
import { TodoDiv, TodoListDiv } from "../../shared/modal";

export let itemsFromBackend = [
  {
    id: "1",
    content: "First task",
    description: "description 1st task",
    progress: 0,
    column: 1,
  },
  {
    id: "2",
    content: "Second task",
    description: "description 2nd task",
    progress: 0,
    column: 1,
  },
  {
    id: "3",
    content: "Third task",
    description: "description 3rd task",
    progress: 0,
    column: 1,
  },
  {
    id: "4",
    content: "Fourth task",
    description: "description 4th task",
    progress: 0,
    column: 1,
  },
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
    destItems.forEach((item) => {
      item.column = destination.droppableId;
    });

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

interface ListI {
  list: string[];
  dataProgress: (progress: number) => void;
}

export const TodoList: React.FC<ListI> = ({ list, dataProgress }: ListI) => {
  const [progress, setProgress] = useState(0);
  const calculateProgress = () => {
    var checkedTotal = document.querySelectorAll(":checked").length;

    setProgress(((checkedTotal - 1) / (list.length - 1)) * 100);
  };
  useEffect(() => {
    dataProgress(progress);
  }, [progress]);
  return (
    <div>
      <TodoListDiv>
        {list.map((item: string, idx) => (
          <TodoDiv>
            <h4>{item}</h4>
            <div>
              Completed:
              <input key={idx} onChange={calculateProgress} type="checkbox" />
            </div>
          </TodoDiv>
        ))}
      </TodoListDiv>
      <h4>Progress of task: {progress.toFixed(2)} %</h4>
    </div>
  );
};


export const switchProgressStyle = (progress: number) => {
  switch (true) {
    case progress < 30:
      return "starting";

    case progress >= 30 && progress < 60:
      return "medium";

    case progress >= 60 && progress <= 99:
      return "advanced";

    case progress > 99:
      return "done";
  }
};

  