import { Card } from "@mui/material";
import React, { useState } from "react";
import { GoBackLink } from "../../shared/button";
import { H3Styled } from "../../shared/titles";
import { TestGallery , questions} from "./productivityTestUtils";

const Test: React.FC = () => {
  
  return (
    <div>
      <H3Styled>Are You Productive Enough? </H3Styled>

        <TestGallery test={questions}></TestGallery>

        <GoBackLink to="home">Back</GoBackLink>

    </div>
  );
};
export default Test;
