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
  findByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import React from "react";
import { InputStyled, RegisterButton } from "../../shared/button";
import { CardWrapper } from "../../shared/card";
import { FormStyled } from "../../shared/form";
import { H1Styled } from "../../shared/titles";
import Login from "./login";
import { LoginModal } from "./loginModal";

test("form submits correctly", async () => {
  const handleSubmit = jest.fn();

  const wrapper = render(<Login onSubmit={handleSubmit} />);

  const modal= render(<LoginModal text={""} />);
 
 
  const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
  const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
  
  const submit = screen.getByTestId("submit-btn");

  userEvent.type(emailInput, "prueba@prueba.com");
  userEvent.type(passwordInput, "dR4D2B7A4f?");


  // const { getByText } = render(
  //   <Button
  //     type="submit"
  //     onClick={handleSubmit({
  //       email: emailInput.value,
  //       password: passwordInput.value,
  //     })}
  //   />
  // );

  userEvent.click(submit);

  expect(emailInput.value).toBe("prueba@prueba.com");
  expect(passwordInput.value).toBe("dR4D2B7A4f?");

  await waitFor(() =>  expect(handleSubmit).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
    email: "prueba@prueba.com",
    password: "dR4D2B7A4f?",
  }));

  expect(modal).toBeTruthy();
});

// test("validations are working correctly", async () => {

//   const handleSubmit = jest.fn();
//   const validateForm = jest.fn();

//   const { getByTestId, getByText } = render(<Formik
//     initialValues={{ email: "", password: "" }}
//     onSubmit={(values) => {
//       handleSubmit(values);
//     }}
//     validate={(values) => validateForm(values)}

//   >
//     {(formik) => (
//       <div>
//         <div id="login-div" data-testid="login-div"></div>
//         <CardWrapper property="50rem">
//           <H1Styled>LOGIN</H1Styled>
//           <FormStyled data-testid="formik-form"onSubmit={formik.handleSubmit}>
//             <label htmlFor="email">Email Address</label>
//             <InputStyled
//               required
//               id="email"
//               type="email"
//               role="email"
//               {...formik.getFieldProps("email")}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div  data-testid="errors-email" style={{color: 'red'}}>{formik.errors.email}</div>
//             ) }

//             <label htmlFor="password">Password</label>
//             <InputStyled
//               required
//               id="password"
//               type="password"
//               {...formik.getFieldProps("password")}
//             />
//             {formik.touched.password && formik.errors.password ? (
//               <p  style={{color: 'red'}}>{formik.errors.password}</p>
//             ) : null}

//             <RegisterButton
//               role="submit-btn"
//               property="29rem"
//               type="submit"
//             >
//               Submit
//             </RegisterButton>
//           </FormStyled>
//         </CardWrapper>
//       </div>
//     )}
//   </Formik>);

//   const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
//   const test = "Invalid email address";

//   userEvent.type(emailInput, "prueba");

  // expect(await screen.getByText(test)).toBeInTheDocument();


  // expect(getByTestId('errors-email')).toBe('Invalid Email Address');




// })