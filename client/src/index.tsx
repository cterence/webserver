import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ModalProvider } from "react-modal-hook";
// import './i18n'

ReactDOM.render(
    <ModalProvider>
        <App />
    </ModalProvider>,
    document.getElementById("root")
);
