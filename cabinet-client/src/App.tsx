import "./App.css";
import React from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@consta/uikit/Theme";
import { myDefaultPreset } from "./utils/presetConsta/constaMyStyle/myDefaultPreset";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';

function Contexts(props: { children: ReactNode }) {
  return <BrowserRouter>{props.children}</BrowserRouter>;
}

const App = () => {
  return (
    <>
      <Theme preset={myDefaultPreset}>
        <Contexts>
          <Header />
          <AppRouter />
        </Contexts>
          <ToastContainer
              theme={'light'}
              position={'bottom-left'}
              draggable={false}
              autoClose={3000}
          />
      </Theme>
    </>
  );
};

export default App;
