import styled from "styled-components";

export const HomePageModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30rem;
    min-width: 40rem;
    position: fixed;
    z-index: 9;
    background-color: #00FA9A;
    top: 30%;
    left: 40%;
    padding: 2rem;
`;


export const ModalDiv = styled.div`
display: flex;
flex-direction: column;
`;

export const ModalInputStyled = styled.input`
width: 27rem;
border: none;
height: 2rem;
margin-bottom: 1rem;
background: #e4e4e4;
`;

export const TodoDiv = styled.div`
display: flex;
align-items: center;
height: 3rem;
justify-content: space-between;
`;

export const AddSubTaskDiv = styled.div`
display: flex;
align-items: flex-start;
`;

export const TodoListDiv = styled.div`
>div:first-child {
    display: none;
}
`;

export const SuccessRegisterModal = styled.div`
  display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2rem;
    min-width: 40rem;
    position: fixed;
    z-index: 9999;
    background-color: green;
    top: 20%;
    left: 34%;
    border-radius: 30rem;
    color: white;
`;