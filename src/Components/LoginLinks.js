import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useUserServices } from "../Hooks/useUserServices";
export function LoginLinks() {
  const {demoLogin} = useUserServices();
  const history = useHistory();
  const push = history?.push;
  function demoClick(){
    push('/');
    demoLogin();
  }

  return (
    <ul className="links">
      <li><button className="link" onClick={demoClick}>Demo</button></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/new-user">Create Account</Link></li>
    </ul>
  );
}
