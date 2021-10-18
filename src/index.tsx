import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ThemeProvider } from "./contexts/themeContext";
import { AuthenticationProvider } from "./contexts/authenticationContext";
import { TaskCounterProvider } from "./contexts/taskCounterContext";
import { BackgroundProvider } from "./contexts/backgroundContext";



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <TaskCounterProvider>
      <AuthenticationProvider>
        <BackgroundProvider>
        <App />
        </BackgroundProvider>
      </AuthenticationProvider>
      </TaskCounterProvider>
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
