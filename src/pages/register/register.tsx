import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { InputStyled, RegisterButton } from "../../shared/button";
import { Link, useHistory } from "react-router-dom";
import { H1Styled, H5Styled } from "../../shared/titles";
import { FormStyled } from "../../shared/form";
import { CardWrapper } from "../../shared/card";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { LoginModal } from "../login/loginModal";

const Register = () => {
  let history = useHistory();

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", phone: "" }}
      onSubmit={(values) => {
        const validateForm = (values: Record<string, any>) => {
          let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

          return (
            values.firstName.length > 0 &&
            values.lastName.length > 0 &&
            emailPattern.test(values.email) &&
            values.phone.length === 8
          );
        };
        const el = document.querySelector("#modal-div")!;

        if (validateForm(values)) {
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
          ));
        }
      }}
    >
      {(formik) => (
        <div>
          <div id="modal-div"></div>
          <CardWrapper property="50rem">
            <H1Styled>SIGN IN</H1Styled>
            <H5Styled>Please,fullfill all fields to register</H5Styled>
            <FormStyled onSubmit={formik.handleSubmit}>
              <label htmlFor="firstName">First Name</label>
              <InputStyled data-testid="firstname-input"
                required
                id="firstName"
                type="text"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}

              <label htmlFor="lastName">Last Name</label>
              <InputStyled data-testid="lastname-input"
                required
                id="lastName"
                type="text"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}

              <label htmlFor="email">Email Address</label>
              <InputStyled
                required
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}

              <label htmlFor="phone">Phone</label>
              <InputStyled
                required
                id="phone"
                type="phone"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div>{formik.errors.phone}</div>
              ) : null}

              <RegisterButton data-testid="submit-btn"  property="29rem" type="submit">
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
