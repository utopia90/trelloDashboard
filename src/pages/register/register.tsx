import React, { useState } from "react";
import { Formik, FormikErrors, useFormik } from "formik";
import { InputStyled, RegisterButton } from "../../shared/button";
import { Link, useHistory } from "react-router-dom";
import { H1Styled, H5Styled } from "../../shared/titles";
import { Errors, FormStyled } from "../../shared/form";
import { CardWrapper } from "../../shared/card";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { LoginModal } from "../login/loginModal";

const Register = () => {
  let history = useHistory();
  const el = document.querySelector("#modal-div")!;
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


  const handleSubmit = (values: Record<string, any>) => {
    const validateSubmit = (values: Record<string, any>) => {
      return (
        values.firstName.length > 0 &&
        values.lastName.length > 0 &&
        emailPattern.test(values.email) &&
        values.phone.length >= 9
      );
    };
    if (validateSubmit(values)) {
      render(
        ReactDOM.createPortal(
          <LoginModal text="Congrats! you registered succesfuly!" />,
          el
        )
      );

      setTimeout(() => {
        history.push("/home");
      }, 2000);
    } else {
      render(
        ReactDOM.createPortal(
          <LoginModal text="Please, fullfill all fields correctly!" />,
          el
        )
      );
    }
  };
  const validateForm = (values: Record<string, any>) => {
    let errors: FormikErrors<Record<string, any>> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !emailPattern.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.phone) {
      errors.phone = "telephone is required";
    } else if (values.phone.length < 9) {
      errors.phone = "telephone should have at least 8 characters";
    }
    if (!values.firstName) {
      errors.firstName = "name is required";
    } else if (values.firstName < 2) {
      errors.firstName = "name should have at least 2 characters";
    }
    if (!values.lastName) {
      errors.lastName = "last name is required";
    } else if (values.lastName < 2) {
      errors.lastName = "last name should have at least 2 characters";
    }

    return errors;
  };


 
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", phone: "" }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validate={(values) => validateForm(values)}

    >
      {(formik) => (
        <div>
          <div id="modal-div"></div>
          <CardWrapper property="50rem">
            <H1Styled>SIGN IN</H1Styled>
            <H5Styled>Please,fullfill all fields to register</H5Styled>
            <FormStyled  onSubmit={formik.handleSubmit}>
              <label htmlFor="firstName">First Name</label>
              <InputStyled
                data-testid="firstname-input"
                required
                id="firstName"
                type="text"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <Errors>{formik.errors.firstName}</Errors>
              ) }

              <label htmlFor="lastName">Last Name</label>
              <InputStyled
                data-testid="lastname-input"
                required
                id="lastName"
                type="text"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <Errors>{formik.errors.lastName}</Errors>
              )}

              <label htmlFor="email">Email Address</label>
              <InputStyled
                required
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                 <Errors>{formik.errors.email}</Errors>
              )}

              <label htmlFor="phone">Phone</label>
              <InputStyled
                required
                id="phone"
                type="phone"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                 <Errors>{formik.errors.phone}</Errors>
              )}

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
export default Register;
