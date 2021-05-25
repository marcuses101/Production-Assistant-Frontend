import { useContext } from "react";
import { MainContext } from "../MainContext";
import {config} from '../config'
const {SERVER,PING} = config

export function useUserServices() {
  const { setIsDemo, setIsLoggedIn } = useContext(MainContext);
  return {
    demoLogin() {
      setIsDemo(true);
      setIsLoggedIn(true);
    },
    // used to ping the server on app load. reduce perceived cold start
    async ping(){
      await fetch(PING);
    },
    async userLogin({ username, password }) {
        const response = await fetch(`${SERVER}/user/login`,{
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username,password})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error?.message || "server error");

        localStorage.setItem("accessToken", data.accessToken);
        setIsDemo(false);
        setIsLoggedIn(true);
    },
    logout() {
      localStorage.removeItem("accessToken");
      setIsDemo(false);
      setIsLoggedIn(false);
    },
    async addUser({username,password}){
      const response = await fetch(`${SERVER}/user`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username,password})
      })
      const data = await response.json();

      if (!response.ok) throw new Error(data?.error?.message || "server error");

      return data;
    },
  };
}
