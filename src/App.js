import React, { useReducer, useState, useEffect } from "react";
import { MainContext } from "./MainContext";
import { demoReducer } from "./demoReducer";
import { demoStore } from "./demoStore";
import { AppRouter } from "./Routing/AppRouter";
import { LoginRouter } from "./Routing/LoginRouter";
import { useUserServices } from "./Hooks/useUserServices";

function App() {
  const [isDemo, setIsDemo] = useState(true);
  const {ping} = useUserServices()
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
    ping();
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsDemo(false);
      setIsLoggedIn(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContext.Provider value={contextValue}>
      {isLoggedIn ? <AppRouter /> : <LoginRouter />}
    </MainContext.Provider>
  );
}

export default App;
