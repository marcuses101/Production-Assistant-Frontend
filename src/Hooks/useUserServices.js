import { useContext } from "react";
import { MainContext } from "../MainContext";
import { useToast } from "./useToast";
import {config} from '../config'
const {SERVER} = config

export function useUserServices() {
  const { setIsDemo, setIsLoggedIn } = useContext(MainContext);
  const toast = useToast();
  return {
    demoLogin() {
      setIsDemo(true);
      setIsLoggedIn(true);
    },
    async userLogin({ username, password }) {
      try {
        const response = await fetch(`${SERVER}/user/login`,{
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username,password})
        })
        const {accessToken,error} = await response.json();
        if (!response.ok) throw error?.message;

        localStorage.setItem("accessToken", accessToken);
        toast.success(`${username} logged in`);
        setIsDemo(false);
        setIsLoggedIn(true);
      } catch (error) {
        toast.error(error);
      }
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
      const user = await response.json();
      console.log(user);
      if (!response.ok) throw new Error(user.error.message);
      return user;
    },
  };
}
