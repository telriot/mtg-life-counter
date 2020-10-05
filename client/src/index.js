import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./contexts/appContext";
import { SocketProvider } from "./contexts/socketContext";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SocketProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
