import { useContext } from "react";
import { UserAPIServices } from "../API/UserAPIServices";
import { MainContext } from "../MainContext";
import { useToast } from "./useToast";

export function useLoginActions() {
  const { setIsDemo, setIsLoggedIn } = useContext(MainContext);
  const toast = useToast();
  return {
    demoLogin() {
      setIsDemo(true);
      setIsLoggedIn(true);
    },
    async userLogin({ username, password }) {
      try {
        const { accessToken } = await UserAPIServices.login({
          username,
          password,
        });
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
  };
}
