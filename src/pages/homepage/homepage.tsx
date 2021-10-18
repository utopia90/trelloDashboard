/* eslint-disable no-useless-computed-key */
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  AddTaskBtn,
  AddTaskInput,
  CloseBtnStyled,
  EditBtnStyled,
  GoBackLink,
} from "../../shared/button";
import {
  AddTaskDiv,
  ColumnStyledDiv,
  CompletedTasksDiv,
  DraggableStyledDiv,
  DropableStyledDiv,
  HomeDivStyled,
  TopMenuDiv,
} from "../../shared/form";
import { H1Styled, H3Styled } from "../../shared/titles";
import { TaskCounterContext } from "../../contexts/taskCounterContext";
import ReactDOM from "react-dom";
import HomePageModal from "./homepageModal";
import {
  itemsFromBackend,
  columnsFromBackend,
  onDragEnd,
} from "./homepageUtils";

const Homepage: React.FC = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const [items, setItems] = useState(itemsFromBackend);
  const [showModal, setShowModal] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  let lastIndex = Object.keys(items).length;
  const [editIndex, setEditIndex] = useState(0);

  const { counter, increment, decrement } =
    React.useContext(TaskCounterContext);

  const [taskEdited, setTaskEdited] = useState(false);

  const newTaskToAdd = {
    id: (lastIndex + 1).toString(),
    content: taskName,
    description: taskDescription,
    column: 1,
  };
  const newColumns = {
    ...columns,
    [1]: { ...columns[1], items: [...columns[1].items, newTaskToAdd] },
  };

  const addTask = () => {
    if (taskName.length > 0 && taskDescription.length > 0) {
      setItems([...items, newTaskToAdd]);
      setColumns(newColumns);
    } else {
      alert("please, add a name and description for the task");
    }
  };

  const deleteTask = (id: number, columnId: number) => {
    columns[columnId].items.splice(id, 1);

    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: [...columns[columnId].items] },
    });
  };

  const editThisTask = () => {
    let itemToEdit = items.filter((item) => item.id === editIndex.toString());
    let column = itemToEdit[0].column;

    itemToEdit[0].content = taskName;
    itemToEdit[0].description = taskDescription;

    setColumns({
      ...columns,
      [column]: { ...columns[column], items: [...columns[column].items] },
    });

    setTaskEdited(true);
  };

  const getDataTaskName = (e: string) => {
    setTaskName(e);
  };

  const getDataTaskDescription = (e: string) => {
    setTaskDescription(e);
  };

  const showEditModal = (id: number) => {
    setTaskEdited(false);
    setShowModal(true);
    setEditIndex(id);
  };
  return (
    <div>
      <H1Styled>TRELLO ORGANIZATION DASHBOARD</H1Styled>
      <TopMenuDiv>
        <AddTaskDiv>
          <AddTaskInput
            placeholder="name of the task"
            onChange={(e) => setTaskName(e.target.value)}
          ></AddTaskInput>
          <AddTaskInput
            placeholder="description of the task"
            onChange={(e) => setTaskDescription(e.target.value)}
          ></AddTaskInput>
          <AddTaskBtn type="button" onClick={addTask}>
            +
          </AddTaskBtn>
        </AddTaskDiv>
      </TopMenuDiv>
      <HomeDivStyled>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <ColumnStyledDiv key={columnId}>
                <H3Styled>{column.name}</H3Styled>
                <div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <DropableStyledDiv
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          color={
                            snapshot.isDraggingOver ? "lightgreen" : "lightgray"
                          }
                        >
                          {column.items.map((item: any, index: number) => {
                            return (
                              <div>
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <DraggableStyledDiv
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        color={
                                          snapshot.isDragging
                                            ? "#00FA9A"
                                            : "#3CB371"
                                        }
                                      >
                                        <h3>{item.content}</h3>
                                        <p>{item.description}</p>
                                        <EditBtnStyled
                                          onClick={() => showEditModal(item.id)}
                                        >
                                          M
                                        </EditBtnStyled>
                                        <CloseBtnStyled
                                          onClick={() =>
                                            deleteTask(index, +columnId)
                                          }
                                        >
                                          X
                                        </CloseBtnStyled>

                                        <div>
                                          {showModal &&
                                            ReactDOM.createPortal(
                                              <HomePageModal
                                                taskEdited={taskEdited}
                                                sendDataTaskName={
                                                  getDataTaskName
                                                }
                                                sendDataTaskDescription={
                                                  getDataTaskDescription
                                                }
                                                editTask={() => editThisTask()}
                                                closeModal={() =>
                                                  setShowModal(false)
                                                }
                                              />,
                                              document.body
                                            )}
                                        </div>
                                      </DraggableStyledDiv>
                                    );
                                  }}
                                </Draggable>
                              </div>
                            );
                          })}
                          {provided.placeholder}
                        </DropableStyledDiv>
                      );
                    }}
                  </Droppable>
                </div>
              </ColumnStyledDiv>
            );
          })}
        </DragDropContext>
      </HomeDivStyled>
      <CompletedTasksDiv>
        Number Of Tasks Completed Today: {counter}
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </CompletedTasksDiv>
      <GoBackLink to="login">Back</GoBackLink>
    </div>
  );
};
export default Homepage;
