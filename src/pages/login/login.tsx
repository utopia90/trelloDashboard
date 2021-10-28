import React, { useContext, useState } from "react";
import { RegisterButton } from "../../shared/button";
import { useHistory } from "react-router-dom";
import { H1Styled } from "../../shared/titles";
import { FormStyled } from "../../shared/form";
import { InputStyled } from "../../shared/button";
import { AuthenticationContext } from "../../contexts/authenticationContext";
import { CardWrapper } from "../../shared/card";
import { LoginModal } from "./loginModal";
import ReactDOM from "react-dom";
import { Formik } from "formik";
import { render } from "@testing-library/react";

// interface LoginI {
//   onSubmit: jest.Mock<any, any>;
// }

 const Login: React.FC = () => {
  const { authenticateUser } = React.useContext(AuthenticationContext);

  let history = useHistory();

  const handleSubmit = async (values: Record<string, any>) => {
    const validateFormLogin = (values: Record<string, any>) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return emailPattern.test(values.email) && values.password.length > 0;
    };
    if (validateFormLogin(values)) {
      console.log(values);

      authenticateUser(true);

      const el = document.querySelector("#login-div")!;
      render(
        ReactDOM.createPortal(
          <LoginModal text="Congrats! your login is succesful" />,
          el
        )
      );

      setTimeout(() => {
        history.push("/home");
      }, 2000);
    } else {
      const el = document.querySelector("#login-div")!;

      authenticateUser(false);
      render(
        ReactDOM.createPortal(
          <LoginModal text="Please, fullfil all fields correctly" />,
          el
        )
      );
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <div>
          <div id="login-div" data-testid="login-div"></div>
          <CardWrapper property="50rem">
            <H1Styled>LOGIN</H1Styled>
            <FormStyled data-testid="formik-form"onSubmit={formik.handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <InputStyled
                required
                id="email"
                type="email"
                role="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}

              <label htmlFor="password">Password</label>
              <InputStyled
                required
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}

              <RegisterButton
                role="submit-btn"
                property="29rem"
                type="submit"
              >
                Submit
              </RegisterButton>
            </FormStyled>
          </CardWrapper>
        </div>
      )}
    </Formik>
  );
};
export default Login;