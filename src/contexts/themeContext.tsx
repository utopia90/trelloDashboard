import React, { useState } from "react";

type ThemeContextI = {
  dark: boolean;
  toggleDark: () => void;
};

export const ThemeContext = React.createContext<ThemeContextI>(
  {} as ThemeContextI
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [dark, setDark] = useState<boolean>(false);

  const toggleDark = () => {
    setDark(!dark);
  };
  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
