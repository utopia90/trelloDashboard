import styled from "styled-components";


export const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  max-width: ${(props) => props.property};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  transform: translate(76%, 50%);
`;


export const TestWrapper = styled.div`
  overflow: hidden;
    margin-top: 3rem;
    padding: 0 0 32px;
    box-shadow: 0 0 20px rgb(0 0 0 / 5%), 0 0px 40px rgb(0 0 0 / 8%);
    border-radius: 5px;
    text-align: center;
    padding: 4rem;
`;
