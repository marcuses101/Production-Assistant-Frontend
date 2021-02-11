import React, { useReducer, useState } from "react";
import { MainContext } from "./MainContext";
import { demoReducer } from "./demoReducer";
import { demoStore } from "./demoStore";
import { AppRouter } from "./AppRouter";
import { LoginRouter } from "./LoginRouter";
import { Sidenav } from "./Sidenav";

function App() {
  const [isDemo, setIsDemo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [demoData, demoDispatch] = useReducer(demoReducer, demoStore);

  const contextValue = {
    isDemo,
    demoData,
    demoDispatch,
    setIsDemo,
    setIsLoggedIn,
  };

  return (
    <MainContext.Provider value={contextValue}>
        {isLoggedIn ? <AppRouter /> : <LoginRouter />}
    </MainContext.Provider>
  );
}

export default App;
