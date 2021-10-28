import styled, { ThemedStyledProps } from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 58%;
  margin: auto;
`;
export const HomeDivStyled = styled.div`
  display: flex;
  justify-content: center;
  height: "100%";
`;

export const ColumnStyledDiv = styled.div`
  display: "flex";
  flex-direction: "column";
  align-items: "center";
  margin-right: 1rem;
`;

export const StyledDivMargin8 = styled.div`
  margin: 8;
`;

export const DropableStyledDiv = styled.div`
  background: ${(props) => props.color};
  padding: 4px;
  width: 280px;
  min-height: 600px;
`;
export const DraggableStyledDiv = styled.div`
  user-select: "none";
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: "white";
  background: ${(props) => props.color};
  position: relative;
`;

export const AddTaskDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

export const CompletedTasksDiv = styled.div`
  position: fixed;
  right: 2rem;
  color: green;
  font-weight: bold;
  font-size: 16px;
`;

export const TopMenuDiv = styled.div`
  display: flex;
  width: 38%;
  justify-content: space-between;
  margin: 0 auto;
`;

export const WeatherDiv = styled.div`
  display: flex;
  width: 100%;
  color: green;

  p {
    margin-right: 1rem;
  }
`;
export const TopAppDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TestDiv = styled.div`
  position: absolute;
    right: 4rem;
    a {
    text-decoration: none;
    color: green;
    border: 2px solid green;
    font-size: 16px;
    padding: 0.7rem;
    border-radius: 8rem;

    :hover{
      background-color:green;
      color: white;
    }
}
`;
const progressStyles = {
  starting: { color: "red", width: "4rem" },
  medium: { color: "yellow", width: "6rem" },
  advanced: { color: "lightgreen", width: "8rem" },
  done: { color: "lightpink", width: "10rem" }
};

export const ProgressDiv = styled.div`
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  width: 10rem;
  background: #555;
  border-radius: 25px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3) 
`;
export const ProgressBar= styled.span.attrs((props) => ({
  property: props.property,
}))`
  height: 14px;
  position: absolute;
  border-radius: 25px;
  padding: 0.15rem;

  ${({ property }) =>
      property &&
      `
      background-color: ${progressStyles[property].color};
      width: ${progressStyles[property].width};
    `};
`;
