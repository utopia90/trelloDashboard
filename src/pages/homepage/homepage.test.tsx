import { Button } from "@mui/material";
import {
  fireEvent,
  getByLabelText,
  render,
  wait,
  waitFor,
  screen,
  getByText,
  within,
  getByTestId,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AddTaskBtn,
  CloseBtnStyled,
  CloseModalBtn,
  EditBtnStyled,
} from "../../shared/button";
import { HomePageModal, ModalInputStyled } from "../../shared/modal";

import Homepage, { getFunction } from "./homepage";
import { itemsFromBackend } from "./homepageUtils";

test("add task function is called correctly", async () => {
  const homepage = render(
    <Router>
      <Homepage />
    </Router>
  );

  const addNameInput = screen.getByTestId("addTask-name") as HTMLInputElement;
  const addDescriptionInput = screen.getByTestId(
    "addTask-description"
  ) as HTMLInputElement;

  userEvent.type(addNameInput, "tarea prueba");
  userEvent.type(addDescriptionInput, "descripcion prueba");

  expect(addNameInput.value).toBe("tarea prueba");
  expect(addDescriptionInput.value).toBe("descripcion prueba");

  userEvent.click(screen.getByRole("add-task-btn"));

  expect(screen.queryByText("tarea prueba")).toBeInTheDocument();
});
test("delete task function is called  correctly", async () => {
  const homepage = render(
    <Router>
      <Homepage />
    </Router>
  );
  const deleteTask = jest.fn();

  const deleteBtn = render(<CloseBtnStyled onClick={deleteTask(1, 1)} />);

  expect(deleteTask).toHaveBeenCalledTimes(1);
  expect(deleteTask).toHaveBeenCalledWith(1, 1);
});

test("edit task shows edit modal correctly", async () => {
  render(
    <Router>
      <Homepage />
    </Router>
  );
  const showEditModal = jest.fn();

  render(
    <EditBtnStyled onClick={showEditModal(1)}>
      <FaEdit />
    </EditBtnStyled>
  );
  const modal = render(<HomePageModal />);

  expect(showEditModal).toHaveBeenCalledTimes(1);
  expect(showEditModal).toHaveBeenCalledWith(1);
});

test("modal shows and works correctly", async () => {
  const modal = render(<HomePageModal />);
  const closeModal = jest.fn();
  const modalBtn = render(
    <CloseModalBtn onClick={closeModal()}>X</CloseModalBtn>
  );
  expect(closeModal).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("Add subitems")).not.toBeInTheDocument();
});

test("modal inputs work correctly", async () => {
  const modal = render(<HomePageModal />);
  const sendDataTaskDescription = jest.fn();
  const sendDataTaskName = jest.fn();
  const setSubtask = jest.fn();
  const handleSubmit = jest.fn();

  render(
    <ModalInputStyled
      required
      onChange={sendDataTaskName("name task edited")}
      placeholder="set new task name"
    />
  );

  render(
    <ModalInputStyled
      required
      onChange={sendDataTaskDescription("description edited")}
      placeholder="set new task description"
    />
  );

  render(<ModalInputStyled onChange={setSubtask("subtask test")} />);
  render(<AddTaskBtn onClick={handleSubmit()}>+</AddTaskBtn>);
  expect(sendDataTaskDescription).toHaveBeenCalledTimes(1);
  expect(sendDataTaskName).toHaveBeenCalledTimes(1);
  expect(setSubtask).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledTimes(1);

  expect(sendDataTaskDescription).toHaveBeenCalledWith("description edited");
  expect(sendDataTaskName).toHaveBeenCalledWith("name task edited");
  expect(setSubtask).toHaveBeenCalledWith("subtask test");

  
  // const value = getFunction(test)

  // expect(value).toBe(4)
});


