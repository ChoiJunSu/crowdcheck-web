import React from "react";
import ReactDom from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

ReactDom.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
