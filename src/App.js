import React, { useReducer, useState } from "react";
import { MainContext } from "./MainContext";
import { projectReducer } from "./projectReducer";
import { Main } from "./Main";
import { demoReducer } from "./demoReducer";
import { demoStore } from "./demoStore";

function App() {
  const [isDemo, setIsDemo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [demoData, demoDispatch] = useReducer(demoReducer, demoStore);

  const contextValue = {
    isDemo,
    demoData,
    demoDispatch,
  };
  const mainProps = { isLoggedIn, setIsLoggedIn };

  return (
    <MainContext.Provider value={contextValue}>
      <div>
        <h1>Hello Production</h1>
        <Main {...mainProps} />
      </div>
    </MainContext.Provider>
  );
}

export default App;
