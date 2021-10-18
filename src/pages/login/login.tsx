import React, { useContext, useState } from "react";
import { RegisterButton, SwitchThemeBtn } from "../../shared/button";
import { useHistory } from "react-router-dom";
import { StyledBody } from "../../shared/body";
import { H1Styled } from "../../shared/titles";
import { FormStyled } from "../../shared/form";
import { InputStyled } from "../../shared/button";
import { AuthenticationContext } from "../../contexts/authenticationContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticateUser } = React.useContext(
    AuthenticationContext
  );

  let history = useHistory();

  const login = () => {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(email) && password.length > 5) {
      authenticateUser(true);
      alert("Congrats,you are logged!");
      history.push("/home");
    } else {
      authenticateUser(false);
      alert("Sorry, you cant be authenticated");
    }
  };

  return (
    <StyledBody>
      <FormStyled className="login-form">
        <div style={{ paddingBottom: "1rem" }}>
          <H1Styled>LOGIN</H1Styled>
        </div>
        <InputStyled
          placeholder="fill in with your email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></InputStyled>
        <InputStyled
          type="password"
          className="email-password"
          placeholder="fill in with your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></InputStyled>
        <RegisterButton onClick={login}>LOGIN</RegisterButton>
      </FormStyled>
    </StyledBody>
  );
};
export default Login;
