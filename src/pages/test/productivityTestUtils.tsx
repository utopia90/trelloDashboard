import React, { useEffect, useState } from "react";
import { AddTaskBtn } from "../../shared/button";
import { TopAppDiv } from "../../shared/form";
import { DivisorSpan } from "../../shared/titles";
import { CardWrapper, TestWrapper } from "../../shared/card";



export const questions = [
  {
    question: "Am I doing everything with a goal in mind?",
    answers: ["True", "False"],
  },
  {
    question: "I'd never check mobile while working...",
    answers: ["True", "False"],
  },
  {
    question: "Eye breaks from the computer are  important",
    answers: ["True", "False"],
  },
  {
    question: "I should create systems that support my goals",
    answers: ["True", "False"],
  },
  { question: "I should track my time", answers: ["True", "False"] },
];
interface testI {
  test: { question: string; answers: string[] }[];
}
export const TestGallery: React.FC<testI> = ({ test }) => {
  const [counter, setCounter] = useState(0);
  const [counterTrue, setCounterTrue] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleCounter = (txt: string) => {
    if (counter < 4) {
      setCounter(counter + 1);
    } else if (counter === 4) {
      setShowResult(true);
    }
    if (txt === "True") {
      setCounterTrue(counterTrue + 1);
    }
  };
  

  const switchMessage = () => {
    switch (true) {
      case counterTrue >= 4:
        return <h3>"Congrats! You are super productive. Keep that way"</h3>;

      case counterTrue === 3:
        return <h3>"You are productive, but you could improve in some areas"</h3>;
    
      case counterTrue < 3:
        return <h3>"You are not productive at all."</h3>;
    }
  };
  
  useEffect(() => {
      setTimeout(() => {
       return showResult  ? setShowResult(false): showResult;
      }, 2000)
  }, [showResult])


  return (
    <div>
      <TestWrapper>
        <h1>{counter <= 4 && test[counter].question}</h1>
        {counter <= 4 &&
          test[counter].answers.map((txt) => (
           <DivisorSpan id="testdiv"><AddTaskBtn onClick={() => handleCounter(txt)}>{txt}</AddTaskBtn></DivisorSpan> 
          ))}
      </TestWrapper>
     
      {showResult && (
        <div>
          <TestWrapper>
            <h4>Your test results</h4>
            {switchMessage()}
          </TestWrapper>
        </div>
      )}
    </div>
  );
};
