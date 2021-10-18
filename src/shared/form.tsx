import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
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
  color: green;
  font-weight: bold;
  font-size: 19px;
  width: 320%;
  margin: 2rem;
`;

export const TopMenuDiv = styled.div`
  display: flex;
  width: 38%;
  justify-content: space-between;
  margin: 0 auto;
`;

export const WeatherDiv = styled.div`
  margin: 2rem 4rem;
`;
export const TopAppDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
