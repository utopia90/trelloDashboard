/* eslint-disable no-useless-computed-key */
/* eslint-disable no-useless-computed-key */
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BrowserRouter, Link, useHistory } from "react-router-dom";
import {FaEdit, FaTimes} from 'react-icons/fa';

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
  ProgressBar,
  ProgressDiv,
  TestDiv,
  TopMenuDiv,
} from "../../shared/form";
import { H1Styled, H3Styled, WeatherSpan } from "../../shared/titles";
import { TaskCounterContext } from "../../contexts/taskCounterContext";
import ReactDOM, { render } from "react-dom";
import HomePageModal from "./homepageModal";
import {
  itemsFromBackend,
  columnsFromBackend,
  onDragEnd,
  switchProgressStyle,
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

   const [progress, setProgress] = useState(0);

   const newTaskToAdd = {
    id: (lastIndex + 1).toString(),
    content: taskName,
    description: taskDescription,
    progress: 0,
    column: 1,
  };
   const newColumns = {
    ...columns,
    [1]: { ...columns[1], items: [...columns[1].items, newTaskToAdd] },
  };

   const addTask =  () => {
    if (taskName.length > 0 && taskDescription.length > 0) {
      setItems([...items, newTaskToAdd]);
      setColumns(newColumns);
    } else {
      alert("please, add a name and description for the task");
    }
  };
    const test = () => {return 4}
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

    if (taskName.length > 0 && taskDescription.length > 0) {
      itemToEdit[0].content = taskName;
      itemToEdit[0].description = taskDescription;
      itemToEdit[0].progress = progress;
    } else {
      alert("please, write name and description of task correctly");
    }

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
      <TestDiv>
        <Link to="test">
          Take the <WeatherSpan>productivity test</WeatherSpan>
        </Link>
      </TestDiv>
      <H3Styled>TRELLO DASHBOARD</H3Styled>
      <TopMenuDiv>
        <AddTaskDiv>
          <AddTaskInput data-testid="addTask-name"
            placeholder="name of the task"
            onChange={(e) => setTaskName(e.target.value)}
          ></AddTaskInput>
          <AddTaskInput data-testid="addTask-description"
            placeholder="description of the task"
            onChange={(e) => setTaskDescription(e.target.value)}
          ></AddTaskInput>
          <AddTaskBtn type="button" onClick={addTask} role="add-task-btn" >
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
                            snapshot.isDraggingOver ? "lightgreen" : "#e4e4e4"
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
                                      <DraggableStyledDiv  data-testid="dragable-div"
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
                                        {item.progress > 0 && (
                                          <ProgressDiv>
                                            <ProgressBar
                                              property={switchProgressStyle(
                                                item.progress.toFixed(2)
                                              )}
                                            >
                                              {item.progress.toFixed(2)}%
                                            </ProgressBar>
                                          </ProgressDiv>
                                        )}
                                        <EditBtnStyled
                                          onClick={() => showEditModal(item.id)}
                                        >
                                          <FaEdit/>
                                        </EditBtnStyled>
                                        <CloseBtnStyled  title="delete-task-btn"
                                          onClick={() =>
                                            deleteTask(index, +columnId)
                                          }
                                        >
                                          <FaTimes />
                                        </CloseBtnStyled>

                                        <div>
                                          {showModal &&
                                            ReactDOM.createPortal(
                                              <HomePageModal
                                                sendProgressData={(progress) =>
                                                  setProgress(progress)
                                                }
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

export const getFunction = (value: any) => {
  return value;
};