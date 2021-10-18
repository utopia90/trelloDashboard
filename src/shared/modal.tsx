import styled from "styled-components";

export const HomePageModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20rem;
    width: 30rem;
    position: fixed;
    z-index: 9;
    background-color: #00FA9A;
    top: 40%;
    left: 40%;
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
`;