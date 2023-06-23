import "./App.css";
import React from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@consta/uikit/Theme";
import { myDefaultPreset } from "./utils/presetConsta/constaMyStyle/myDefaultPreset";
function Contexts(props) {
    return React.createElement(BrowserRouter, null, props.children);
}
const App = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Theme, { preset: myDefaultPreset },
            React.createElement(Contexts, null,
                React.createElement(AppRouter, null)))));
};
export default App;
//# sourceMappingURL=App.js.map