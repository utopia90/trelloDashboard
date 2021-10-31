import React, { useContext, useState } from "react";
import { RegisterButton } from "../../shared/button";
import { useHistory } from "react-router-dom";
import { H1Styled } from "../../shared/titles";
import { Errors, FormStyled } from "../../shared/form";
import { InputStyled } from "../../shared/button";
import { AuthenticationContext } from "../../contexts/authenticationContext";
import { CardWrapper } from "../../shared/card";
import { LoginModal } from "./loginModal";
import ReactDOM from "react-dom";
import { Form, Formik, FormikErrors } from "formik";
import { render } from "@testing-library/react";

interface Props {
  onSubmit: (values: { email: string; password: string }) => void;
}
interface values {
  email: string;
  password: string;
}

const Login: React.FC<any> = ({ onSubmit }) => {
  const { authenticateUser } = React.useContext(AuthenticationContext);

  let history = useHistory();

  const handleLogin = (values: values) => {
    const validateFormLogin = (values: values) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return emailPattern.test(values.email) && values.password.length > 0;
    };
    if (validateFormLogin(values)) {
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
  const validateForm = (values: values) => {
    let errors: FormikErrors<Record<string, any>> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "password should have at least 4 characters";
    }

    return errors;
  };

  const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

  // const handleSubmit = async (values: any) => {
  //   await sleep(500);
  //   submitValues(values) //Qué se quiere hacer con esto?
  // }
  const handleSubmit = async (values: any) => {
    await sleep(500);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        handleSubmit(values);
        handleLogin(values);

      }}
      validate={(values) => validateForm(values)}
    >
      {(formik) => (
        <div>
          <div id="login-div" data-testid="login-div"></div>
          <CardWrapper property="50rem">
            <H1Styled>LOGIN</H1Styled>
            <FormStyled onSubmit={formik.handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <InputStyled
                required
                id="email"
                type="email"
                role="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <Errors>{formik.errors.email}</Errors>
              ) : null}

              <label htmlFor="password">Password</label>
              <InputStyled
                required
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <Errors>{formik.errors.password}</Errors>
              ) : null}

              <RegisterButton
                data-testid="submit-btn"
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
