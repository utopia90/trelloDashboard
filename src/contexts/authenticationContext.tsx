import React, { useState } from "react";

type AuthenticationContextI = {
  loggedIn: boolean;
  authenticateUser: (value: boolean) => void;
};

export const AuthenticationContext =
  React.createContext<AuthenticationContextI>({} as AuthenticationContextI);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const authenticateUser = (value: boolean) => {
    setLoggedIn(value);
  };

  return (
    <AuthenticationContext.Provider value={{ loggedIn, authenticateUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
