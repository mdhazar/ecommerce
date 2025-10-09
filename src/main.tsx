import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(
	<Provider store={store}>
		<App />
	</Provider>,
);
