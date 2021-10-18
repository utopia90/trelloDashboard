import React, { useState } from "react";

type TaskCounterI = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

export const TaskCounterContext = React.createContext<TaskCounterI>(
  {} as TaskCounterI
);

export const TaskCounterProvider: React.FC = ({ children }) => {
  const [counter, setCounter] = useState(0)

  const increment = () => {
   setCounter(counter + 1)
  };
  const decrement = () => {
    setCounter(counter - 1)
  };
  return (
    <TaskCounterContext.Provider value={{ counter, increment, decrement }}>
      {children}
    </TaskCounterContext.Provider>
  );
};