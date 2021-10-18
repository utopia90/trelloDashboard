import React from "react";
import { Formik, useFormik } from "formik";
import { InputStyled, RegisterButton } from "../../shared/button";
import { Link, useHistory } from "react-router-dom";
import { H1Styled, H3Styled } from "../../shared/titles";
import { FormStyled } from "../../shared/form";

const Register = () => {
  let history = useHistory();

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", phone: "" }}
      onSubmit={(values) => {
        const validateForm = (values: Record<string, any>) => {
          return (
            values.firstName.length > 0 &&
            values.lastName.length > 0 &&
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
            values.phone.length === 8
          );
        };

        if (validateForm(values)) {
          alert("congrats!, you registered successfully!");
          history.push("login");
        } else {
          alert("Please, fullfill all fields correctly!");
        }
      }}
    >
      {(formik) => (
        <div>
          <H1Styled>TRELLO REGISTER PAGE</H1Styled>
          <H3Styled>Please,fullfill all fields to register</H3Styled>
          <FormStyled onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <InputStyled required
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}

            <label htmlFor="lastName">Last Name</label>
            <InputStyled required
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}

            <label htmlFor="email">Email Address</label>
            <InputStyled required
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="phone">Phone</label>
            <InputStyled required
              id="phone"
              type="phone"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div>{formik.errors.phone}</div>
            ) : null}

            <RegisterButton type="submit">Submit</RegisterButton>
          </FormStyled>
        </div>
      )}
    </Formik>
  );
};
export default Register;
