/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";

export const StyledBody = styled.div`
  background: ${(props) => props.color};
  height: 100vh;
  background-image: url(${(props) => props.theme});
  background-repeat: no-repeat;
  background-size: cover;
`;
