import React, { useReducer, useState, useEffect } from "react";
import { MainContext } from "./MainContext";
import { demoReducer } from "./demoReducer";
import { demoStore } from "./demoStore";
import { AppRouter } from "./AppRouter";
import { LoginRouter } from "./LoginRouter";

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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsDemo(false);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <MainContext.Provider value={contextValue}>
      {isLoggedIn ? <AppRouter /> : <LoginRouter />}
    </MainContext.Provider>
  );
}

export default App;
