import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {CssBaseline} from '@material-ui/core'
const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <CssBaseline/>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  rootElement
);
