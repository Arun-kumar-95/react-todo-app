// IMPORT REACT FROM REACT
import React from "react";
// IMPORT REACT DOM FROM REACT DOM
import ReactDOM from "react-dom/client";
// IMPORTING THE APP FROM TODO CONTAINER
import App from "./Components/TodoContainer";
// IMPORTING THE STYLES
import "./main.css";
// INITIALIZING THE ROOT COMPONENT
const root = ReactDOM.createRoot(document.getElementById("root"));
// INITIALIZING THE ROOT COMPONENT
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
