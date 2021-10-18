import React, { useState } from "react";

type BackgroundContextI = {
  backgroundChoice: string;
  changeBackground: (value: string ) => void;
};

export const BackgroundContext = React.createContext<BackgroundContextI>(
  {} as BackgroundContextI
);

export const BackgroundProvider: React.FC = ({ children }) => {
  const [backgroundChoice, setBackgroundChoice] = useState("");
  const changeBackground = (value: string) => {
    setBackgroundChoice(value);
  };
  return (
    <BackgroundContext.Provider value={{ backgroundChoice, changeBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};
