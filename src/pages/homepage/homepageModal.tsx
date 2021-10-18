import React from "react";
import { CloseModalBtn, EditTaskBtn } from "../../shared/button";
import { HomePageModal, ModalDiv, ModalInputStyled } from "../../shared/modal";

interface closeModalI {
  editTask: () => void;
  closeModal: () => void;
  sendDataTaskName: (e: string) => void;
  sendDataTaskDescription: (e: string) => void;
  taskEdited: boolean;
}

const homepageModal = ({
  closeModal,
  editTask,
  sendDataTaskName,
  sendDataTaskDescription,
  taskEdited,
}: closeModalI) => {
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
          <EditTaskBtn onClick={editTask}>Edit Task</EditTaskBtn>
          <h4>{taskEdited && "Task Edited successfully!"}</h4>
        </ModalDiv>
      </HomePageModal>
    </div>
  );
};

export default homepageModal;
