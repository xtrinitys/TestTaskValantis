import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { setupAxios } from "./utils/API";

setupAxios();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<App />);
