import "./App.css";
import React from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@consta/uikit/Theme";
import {myDefaultPreset} from "./utils/presetConsta/constaMyStyle/myDefaultPreset";


function Contexts(props: { children: ReactNode }) {
  return <BrowserRouter>{props.children}</BrowserRouter>;
}

const App = () => {
  return (
    <>
      <Theme preset={myDefaultPreset}>
        <Contexts>
          <AppRouter />
        </Contexts>
      </Theme>
    </>
  );
};

export default App;
