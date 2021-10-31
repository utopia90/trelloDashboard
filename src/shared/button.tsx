import { Link } from "react-router-dom";
import styled from "styled-components";

export const RegisterButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  width: 26rem;
  background: green;
  color: white;
  margin: 0 auto;
  margin-top: 1rem;
  cursor: pointer;
  width: 29rem;
  border-radius: 19rem;
  height: 2.6rem;

  :hover {
    background: white;
    color: black;
  }
`;

export const SwitchThemeBtn = styled.button`
  display: inline-block;
  border-radius: 7px;
  padding: 0.5rem 0;
  width: 12rem;
  background: transparent;
  color: green;
  justify-content: "center";
  cursor: pointer;
  border: 2px solid green;
  font-size: "12px";
  cursor: pointer;

  :hover {
    background: #3cb371;
    color: black;
  }
`;

export const InputStyled = styled.input.attrs(({ type }) => ({
  type: type || "text",
}))`
  height: 2rem;
  border: none;
  background-color: rgb(232, 240, 254);
  margin-bottom: 0.3rem;
`;

export const CloseBtnStyled = styled.span`
  position: absolute;
  right: 5px;
  font-weight: bold;
  font-size: 20px;
  top: 2px;
`;
export const EditBtnStyled = styled.span`
  position: absolute;
  right: 5px;
  font-weight: bold;
  font-size: 20px;
  bottom: 2px;
`;
export const AddTaskInput = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 3px solid green;
  width: 20rem;
  margin-right: 1rem;
`;

export const AddTaskBtn = styled.button`
  border: none;
  font-size: 30px;
  color: green;
  cursor: pointer;
`;

export const GoBackLink = styled(Link)`
  display: inline-block;
  border-radius: 4px;
  padding: 0.5rem 0;
  width: 6rem;
  background: transparent;
  color: green;
  justify-content: "center";
  cursor: pointer;
  border: 2px solid green;
  font-size: 17px;
  cursor: pointer;
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  text-decoration: none;
  text-align: center;

  :hover {
    background: #3cb371;
    color: black;
  }
`;

export const CloseModalBtn = styled.button`
  border: none;
  font-size: 30px;
  color: black;
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: 2px;
  height: 2rem;
`;

export const EditTaskBtn = styled.button`
  border: none;
  font-size: 30px;
  cursor: pointer;

  :hover {
    background: #3cb371;
  }
`;

export const BackgroundSelect = styled.select`
  display: inline-block;
  border-radius: 7px;
  padding: 0.5rem 0;
  width: 12rem;
  background: transparent;
  color: green;
  justify-content: "center";
  cursor: pointer;
  border: 2px solid green;
  font-size: "12px";
  cursor: pointer;
  margin-top: 1rem;

  :hover {
    background: #3cb371;
  }
`;
export const OptionStyled = styled.option`
  text-align: center;
  background: white;
  font-size: 15px;
`;
export const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  position: relative;
  left: 3rem;
  top: 2rem;
`;
