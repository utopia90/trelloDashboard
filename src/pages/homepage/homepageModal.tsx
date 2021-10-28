import React, { useEffect, useState } from "react";
import { AddTaskBtn, CloseModalBtn, EditTaskBtn } from "../../shared/button";
import {
  AddSubTaskDiv,
  HomePageModal,
  ModalDiv,
  ModalInputStyled,
} from "../../shared/modal";
import { TodoList } from "./homepageUtils";

interface closeModalI {
  editTask: () => void;
  closeModal: () => void;
  sendDataTaskName: (e: string) => void;
  sendDataTaskDescription: (e: string) => void;
  taskEdited: boolean;
  sendProgressData: (progress: number) => void;
}

const HomepageModal = ({
  closeModal,
  editTask,
  sendDataTaskName,
  sendDataTaskDescription,
  taskEdited,
  sendProgressData,
}: closeModalI) => {
  const [subtask, setSubtask] = useState("");
  const [list, setList] = useState([""]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    sendProgressData(progress);
  }, [progress]);

  const handleSubmit = () => {
    if (subtask.length > 0) {
      setList([...list, subtask]);
    } else {
      alert("please, enter a valid task name");
    }
  };

  return (
    <div>
      <HomePageModal>
        <CloseModalBtn onClick={closeModal}>X</CloseModalBtn>
        <ModalDiv>
          <ModalInputStyled 
            required
            onChange={(e) => sendDataTaskName(e.target.value)}
            placeholder="set new task name"
          />
          <ModalInputStyled 
            required
            onChange={(e) => sendDataTaskDescription(e.target.value)}
            placeholder="set new task description"
          />
          Add subitems:
          <AddSubTaskDiv>
            <ModalInputStyled onChange={(e) => setSubtask(e.target.value)} />
            <AddTaskBtn onClick={handleSubmit}>+</AddTaskBtn>
          </AddSubTaskDiv>
          <TodoList
            dataProgress={(progress) => setProgress(progress)}
            list={list}
          ></TodoList>
          <EditTaskBtn onClick={editTask}>Edit Task</EditTaskBtn>
          <h4>{taskEdited && "Task Edited successfully!"}</h4>
        </ModalDiv>
      </HomePageModal>
    </div>
  );
};

export default HomepageModal;