import { useContext } from "react";
import { MainContext } from "../MainContext";

export function useLoginActions(){
  const {setIsDemo, setIsLoggedIn} = useContext(MainContext);

  return {
    demoLogin(){
      setIsDemo(true);
      setIsLoggedIn(true)
    },
    userLogin(){},
    logout(){
      setIsDemo(false);
      setIsLoggedIn(false)
    }
  }
}