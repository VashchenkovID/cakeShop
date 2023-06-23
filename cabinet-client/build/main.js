import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(React.StrictMode, null,
    React.createElement(Provider, { store: store },
        React.createElement(App, null))));
//# sourceMappingURL=main.js.map