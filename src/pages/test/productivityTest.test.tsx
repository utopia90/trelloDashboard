import { Button } from "@mui/material";
import {
  fireEvent,
  getByLabelText,
  render,
  wait,
  waitFor,
  screen,
  getByText,
  within,
  getByTestId,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Test from "./productivityTest";
import { TestGallery , questions} from "./productivityTestUtils";
 


test("test questions display correctly",  () => {

    const test = render(<TestGallery test={questions} />);
    const nextQuestionBtn = test.getAllByTestId("test-btn")[0];
    const questionsDiv = test.getByTestId("questions-div");



    expect(questions[0].question).toEqual("Am I doing everything with a goal in mind?");
    expect(questionsDiv).toContainHTML(`<h1 data-testid="questions-div">Am I doing everything with a goal in mind?</h1>`)
    
     userEvent.click(nextQuestionBtn)
     
     expect(questionsDiv).not.toContainHTML(`<h1 data-testid="questions-div">Am I doing everything with a goal in mind?</h1>`)
     expect(questionsDiv).toContainHTML(`<h1 data-testid="questions-div">I'd never check mobile while working...</h1>`)


});