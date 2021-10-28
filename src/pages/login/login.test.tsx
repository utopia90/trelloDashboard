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
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormStyled } from "../../shared/form";
import Login from "./login";
import { LoginModal } from "./loginModal";

test("form submits correctly", async () => {
  const handleSubmit = jest.fn();

  const wrapper = render(<Login />);

  const modal = render(<LoginModal text={""} />);

  const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
  const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
  const form = screen.getByTestId("formik-form") as HTMLFormElement;
  const modalDiv = screen.getByTestId("login-div") as HTMLElement;

  userEvent.type(emailInput, "prueba@prueba.com");
  userEvent.type(passwordInput, "dR4D2B7A4f?");
  expect(screen.getByText("Submit")).toBeTruthy();

  const { getByText } = render(
    <Button
      type="submit"
      onClick={handleSubmit({
        email: emailInput.value,
        password: passwordInput.value,
      })}
    />
  );

  fireEvent.click(getByText("Submit"));

  expect(emailInput.value).toBe("prueba@prueba.com");
  expect(passwordInput.value).toBe("dR4D2B7A4f?");

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    email: "prueba@prueba.com",
    password: "dR4D2B7A4f?",
  });

  expect(modal).toBeTruthy();
});
