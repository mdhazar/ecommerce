import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import React from "react";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
